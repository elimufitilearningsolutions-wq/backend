import { poolUsers } from "../db.js";
import jwt from "jsonwebtoken";

// Returns true if user is subscribed (Amount > 0), false otherwise
export const isUserSubscribed = async (userId) => {
    if (!userId) throw new Error("Invalid userId passed to check subscription");

    const [rows] = await poolUsers.query(
        'SELECT Amount FROM elimufi1_users.signup WHERE user_id = ?',
        [userId]
    );

    if (rows.length === 0) return false;  // No user found
    return rows[0].Amount > 0;             // true if Amount > 0
};

// Middleware: protects routes and enforces subscription
export const protectedEndpoint = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ errorMessage: 'Access denied. No token provided.' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ errorMessage: 'Access denied. No token provided.' });

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);

        const [userId] = decoded.payload;
        req.userId = userId;

        // Properly call subscription check
        const subscribed = await isUserSubscribed(userId);
        if (!subscribed) return res.status(403).json({ errorMessage: 'Access denied. User is not subscribed.' });

        // User is logged in and subscribed
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(400).json({ errorMessage: 'Invalid token or other validation error.' });
    }
};
