import { poolUsers } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from 'dotenv';
import { safeQuery } from "../db.js";
import { setUserToken, removeUserToken, getUserToken } from "./userTokenManager.js";
import { getSubscriptionStatus } from "./mpesaController.js";
dotenv.config();
// Define the generateSecretKey function
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex'); // Generates a 64-character hexadecimal string (32 bytes)
};

// Generate a random secret key when the server starts
const secretKey = process.env.JWT_SECRET_KEY;


export const signup = async (req, res) => {
    try {
        const { email, password, name, phoneNumber } = req.body;

        if (!(email && password && name)) {
            return res.status(400).json({ errorMessage: "All fields are required" });
        }

        // 1. Check if user exists
        const checkUserSql = "SELECT * FROM signup WHERE email = ?";
        const [existing] = await poolUsers.query(checkUserSql, [email]);

        if (existing.length > 0) {
            return res.status(400).json({ errorMessage: "User with this email already exists" });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insert user
        const insertSql = `
            INSERT INTO signup (email, password, name, phoneNumber)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await poolUsers.query(insertSql, [
            email,
            hashedPassword,
            name,
            phoneNumber
        ]);

        const userId = result.insertId;
        const isAdmin = 0;

        // 4. LOGIN LOGIC (same as login controller)
        const payload = [userId, isAdmin];
        const token = jwt.sign({ payload }, secretKey, { expiresIn: "1d" });

        const updateTokenSql = `
            UPDATE signup
            SET current_token = ?
            WHERE user_id = ?
        `;
        await poolUsers.query(updateTokenSql, [token, userId]);

        // 5. Return EXACT login response
        return res.status(201).json({
            message: "Signup & login successful",
            token,
            userId
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};


// Update a user
export const updateUser = async (req, res) => {
    try {
        console.log("Received update request:", req.body); // Log received request data

        const userId = req.params.user_id; // Get user ID from the URL parameter
        const {
            email,
            password,
            name,
            isAdmin,
            isSubscribed,
            phoneNumber,
            checkoutRequestID,
            mpesaReceiptNumber,
            transactionDate,
            amount,
            expiresIn, // Add this if needed
        } = req.body;

        // Validate required fields
        if (!userId) {
            return res.status(400).json({ errorMessage: "User ID is required" });
        }

        // Check if the user exists
        const checkUserSql = "SELECT * FROM signup WHERE user_id = ?";
        const [checkUserData] = await poolUsers.query(checkUserSql, [userId]);

        // If user with the provided ID does not exist, return an error
        if (checkUserData.length === 0) {
            return res.status(404).json({ errorMessage: "User not found" });
        }

        // Prepare fields to update
        const updateFields = {};
        if (email) updateFields.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
            updateFields.password = hashedPassword;
        }
        if (name) updateFields.name = name;
        if (isAdmin !== undefined) updateFields.isAdmin = isAdmin;
        if (isSubscribed !== undefined) updateFields.isSubscribed = isSubscribed;
        if (amount !== undefined) updateFields.amount = amount;
        if (expiresIn !== undefined) updateFields.expiresIn = expiresIn;
        if (phoneNumber) updateFields.phoneNumber = phoneNumber;
        if (checkoutRequestID) updateFields.checkoutRequestID = checkoutRequestID;
        if (mpesaReceiptNumber) updateFields.mpesaReceiptNumber = mpesaReceiptNumber;
        if (transactionDate) updateFields.transactionDate = transactionDate;

        // Check if there are fields to update
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ errorMessage: "No valid fields provided for update" });
        }

        // Build the SQL update query dynamically based on provided fields
        const setClause = Object.keys(updateFields).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updateFields);
        const updateUserSql = `UPDATE signup SET ${setClause} WHERE user_id = ?`;
        values.push(userId);

        // Execute the update query
        await poolUsers.query(updateUserSql, values);

        // Return success response
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        // Catch the actual error
        console.error("Internal Server Error:", error);

        // Return a generic error message for other types of errors
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const getUserSql = "SELECT * FROM signup WHERE email = ?";
        const [userData] = await poolUsers.query(getUserSql, [email]);

        if (userData.length === 0) {
            return res.status(404).json({ errorMessage: "User not found" });
        }

        const userId = userData[0].user_id;
        const isAdmin = userData[0].isAdmin
        const hashedPassword = userData[0].password;
        const currentToken = userData[0].current_token;
        
        if(currentToken && currentToken.trim() !==""){
            return res.status(401).json({errorMessage: "user already in session"})
        }

        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ errorMessage: "Invalid password" });
        }

        
        const payload = [userId, isAdmin ]
        const token = jwt.sign({ payload}, secretKey, { expiresIn: "1d" });
         // Store the new token in the database, replacing the old token
        const updateTokenSql = "UPDATE signup SET current_token = ? WHERE user_id = ?";
        await poolUsers.query(updateTokenSql, [token, userId]);
        //await setUserToken(token); // Ensure this function is defined or remove if unnecessary
        //console.log("Generated Token:", token);
        return res.status(200).json({ message: "Login successful", token, userId });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};
export const logout = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from URL parameter
        if(!userId){
            return res.json({errorMessege: "no userId"})
        }
        const clearTokenSql = `
            UPDATE signup 
            SET current_token = NULL 
            WHERE user_id = ? AND current_token IS NOT NULL`;
        await poolUsers.query(clearTokenSql, [userId]);
        

        // Proceed to clear the token in the database without verifying the user's identity
        //await deleteTokenById(userId);

        return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error.message);
        return res.status(500).json({ success: false, errorMessage: "Internal Server Error" });
    }
};


// Helper function to delete the token
export const deleteTokenById = async (userId) => {
    try {
        const deleteTokenSql = "UPDATE signup SET current_token = NULL WHERE user_id = ?";
        await poolUsers.query(deleteTokenSql, [userId]); // Update query
    } catch (error) {
        console.error("Error deleting token:", error.message);
        throw new Error("Token deletion failed");
    }
};



export const protectedEndpoint = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ errorMessage: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from header
    if (!token) {
        return res.status(401).json({ errorMessage: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded Token:', decoded);

        // Extract the userId from the payload
        const { payload } = decoded;
        const [userId] = payload;
        req.userId = userId; // Store userId in the request object
     
        // Check if the user is subscribed
        const isSubscribed = await getSubscriptionStatus; // Assuming this function checks subscription status
        
        if (!isSubscribed) {
            return res.status(403).json({ errorMessage: 'Access denied. User is not subscribed.' });
        }

        // User is logged in and subscribed, proceed to the next middleware
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(400).json({ errorMessage: 'Invalid token or other validation error.' });
    }
};






export const getUsers = async (req, res) => {
    try {
        // Fetch all data from the signup table
        const sql = "SELECT user_id, email, name, isAdmin, isSubscribed, amount, expiresIn, phoneNumber FROM signup";
        const [result] = await poolUsers.query(sql);

        // Check if any data was fetched
        if (result.length === 0) {
            return res.status(404).json({ error: "No resources found in signup." });
        }

        // Send success response with fetched data
        return res.status(200).json(result);
    } catch (error) {
        // Handle database error
        console.error("Error fetching resources from signup in database:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};
export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params; // Get the ID from the request parameters
        const sql = "SELECT * FROM signup WHERE user_id = ?";
        const [results] = await poolUsers.query(sql, [user_id]); // Pass the ID as a parameter to the query
        
        if (results.length === 0) {
            return res.status(404).json({ error: "No User with this ID exists." });
        }
        
        return res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching the user in the database:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};