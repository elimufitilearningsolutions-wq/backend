import { poolUsers } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

// ================== SIGNUP ==================
export const signup = async (req, res) => {
    try {
        const { email, password, name, phoneNumber } = req.body;

        if (!(email && password && name)) {
            return res.status(400).json({ errorMessage: "All fields are required" });
        }

        const [existing] = await poolUsers.query("SELECT * FROM signup WHERE email = ?", [email]);
        if (existing.length > 0) return res.status(400).json({ errorMessage: "User with this email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await poolUsers.query(
            "INSERT INTO signup (email, password, name, phoneNumber) VALUES (?, ?, ?, ?)",
            [email, hashedPassword, name, phoneNumber]
        );

        const userId = result.insertId;
        const isAdmin = 0;
        const payload = [userId, isAdmin];
        const token = jwt.sign({ payload }, secretKey, { expiresIn: "1d" });

        await poolUsers.query("UPDATE signup SET current_token = ? WHERE user_id = ?", [token, userId]);

        // ✅ Log userId and isAdmin
        console.log("SIGNUP:", { userId, isAdmin, token });

        return res.status(201).json({ message: "Signup & login successful", token, userId, isAdmin });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};

// ================== LOGIN ==================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [userData] = await poolUsers.query("SELECT * FROM signup WHERE email = ?", [email]);
        if (userData.length === 0) return res.status(404).json({ errorMessage: "User not found" });

        const user = userData[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.status(401).json({ errorMessage: "Invalid password" });
        if (user.current_token && user.current_token.trim() !== "") return res.status(401).json({ errorMessage: "User already in session" });

        const payload = [user.user_id, user.isAdmin];
        const token = jwt.sign({ payload }, secretKey, { expiresIn: "1d" });

        await poolUsers.query("UPDATE signup SET current_token = ? WHERE user_id = ?", [token, user.user_id]);

        // ✅ Log userId and isAdmin
        console.log("LOGIN:", { userId: user.user_id, isAdmin: user.isAdmin, token });

        return res.status(200).json({ message: "Login successful", token, userId: user.user_id, isAdmin: user.isAdmin });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};

// ================== LOGOUT ==================
export const logout = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ errorMessage: "No userId provided" });

        await poolUsers.query("UPDATE signup SET current_token = NULL WHERE user_id = ?", [userId]);
        return res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error", success: false });
    }
};

// ================== UPDATE USER ==================
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) return res.status(400).json({ errorMessage: "User ID is required" });

        const [checkUserData] = await poolUsers.query("SELECT * FROM signup WHERE user_id = ?", [userId]);
        if (checkUserData.length === 0) return res.status(404).json({ errorMessage: "User not found" });

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
            expiresIn,
        } = req.body;

        const updateFields = {};
        if (email) updateFields.email = email;
        if (password) updateFields.password = await bcrypt.hash(password, 10);
        if (name) updateFields.name = name;
        if (isAdmin !== undefined) updateFields.isAdmin = isAdmin;
        if (isSubscribed !== undefined) updateFields.isSubscribed = isSubscribed;
        if (amount !== undefined) updateFields.amount = amount;
        if (expiresIn !== undefined) updateFields.expiresIn = expiresIn;
        if (phoneNumber) updateFields.phoneNumber = phoneNumber;
        if (checkoutRequestID) updateFields.checkoutRequestID = checkoutRequestID;
        if (mpesaReceiptNumber) updateFields.mpesaReceiptNumber = mpesaReceiptNumber;
        if (transactionDate) updateFields.transactionDate = transactionDate;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ errorMessage: "No valid fields provided for update" });
        }

        const setClause = Object.keys(updateFields).map(f => `${f} = ?`).join(', ');
        const values = [...Object.values(updateFields), userId];

        await poolUsers.query(`UPDATE signup SET ${setClause} WHERE user_id = ?`, values);
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Update user error:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};

// ================== GET USERS ==================
export const getUsers = async (req, res) => {
    try {
        const [users] = await poolUsers.query(
            "SELECT user_id, email, name, isAdmin, isSubscribed, amount, expiresIn, phoneNumber FROM signup"
        );
        if (users.length === 0) return res.status(404).json({ errorMessage: "No users found" });
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const [users] = await poolUsers.query("SELECT * FROM signup WHERE user_id = ?", [user_id]);
        if (users.length === 0) return res.status(404).json({ errorMessage: "User not found" });
        return res.status(200).json(users[0]);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};

// ================== PROTECTED ENDPOINT ==================
export const protectedEndpoint = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ errorMessage: 'Access denied. No token provided.' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ errorMessage: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, secretKey);

        // Extract both from the array
        const [userId, isAdmin] = decoded.payload;
        req.userId = userId;
        req.isAdmin = isAdmin;  

        // ✅ Log for debugging
        console.log('Protected Endpoint:', { userId, isAdmin });

        // Check subscription: Amount > 0
        const [rows] = await poolUsers.query(
            'SELECT amount FROM signup WHERE user_id = ?',
            [userId]
        );
        const amount = rows.length > 0 ? rows[0].amount : 0;
        if (!amount || amount <= 0) return res.status(403).json({ errorMessage: 'Access denied. User is not subscribed.' });

        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(400).json({ errorMessage: 'Invalid token or other validation error.' });
    }
};


