// Import necessary modules
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Common pool configuration settings
const createPoolConfig = (database) => ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
    connectTimeout: 30000,
   // acquireTimeout: 30000, // Wait longer before giving up on acquiring a connection
    debug: false
});

// Helper function to retry queries in case of transient errors
const safeQuery = async (pool, sql, params = []) => {
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const start = Date.now();
            const [rows] = await pool.query(sql, params);
            console.log(`Query executed in ${Date.now() - start}ms`);
            return rows;
        } catch (error) {
            if (error.code === 'ECONNRESET' && attempt < 3) {
                console.warn(`ECONNRESET error. Retrying query... Attempt ${attempt}`);
                continue;
            }
            console.error("Database query error:", error.message);
            throw error;
        }
    }
};

// Create connection pools for each database
const databases = {
    poolJSS: process.env.DB_NAME_JSS,
    poolUsers: process.env.DB_NAME_USERS,
    poolPreprimary: process.env.DB_NAME_PREPRIMARY,
    poolSecondary: process.env.DB_NAME_SECONDARY,
    poolPrimarySchool: process.env.DB_NAME_PRIMARYSCHOOL,
};

const pools = Object.entries(databases).reduce((acc, [key, dbName]) => {
    acc[key] = mysql.createPool(createPoolConfig(dbName));
    return acc;
}, {});

// Log pool error events
Object.values(pools).forEach(pool => {
    pool.on('error', (err) => {
        console.error("Database Pool Error:", err);
    });
});

// Periodic keep-alive function
const keepConnectionAlive = (pool) => {
    setInterval(async () => {
        try {
            await pool.query('SELECT 1');
        } catch (error) {
            console.warn("Keep-alive query failed:", error.message);
        }
    }, 1000 * 60); // Run every minute
};

// Initialize keep-alive for each pool
Object.values(pools).forEach(pool => {
    keepConnectionAlive(pool);
});

// Gracefully close pools on process exit
process.on('SIGINT', async () => {
    try {
        console.log("Closing database connections...");
        await Promise.all(Object.values(pools).map(pool => pool.end()));
        console.log("All database connections closed.");
        process.exit(0);
    } catch (err) {
        console.error("Error closing database connections:", err);
        process.exit(1);
    }
});

// Export individual pools and the safeQuery function
export const poolJSS = pools.poolJSS;
export const poolUsers = pools.poolUsers;
export const poolPreprimary = pools.poolPreprimary;
export const poolSecondary = pools.poolSecondary;
export const poolPrimarySchool = pools.poolPrimarySchool;

export { safeQuery };
