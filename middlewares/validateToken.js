export const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header

        if (!token) {
            return res.status(401).json({ errorMessage: "Access denied, no token provided" });
        }

        // Verify token is valid
        const decoded = jwt.verify(token, secretKey);

        const getUserSql = "SELECT current_token FROM signup WHERE user_id = ?";
        const [userData] = await poolUsers.query(getUserSql, [decoded.userId]);

        if (userData.length === 0 || userData[0].current_token !== token) {
            return res.status(401).json({ errorMessage: "Invalid session, please login again" });
        }

        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        console.error("Token validation error:", error);
        return res.status(401).json({ errorMessage: "Invalid or expired token" });
    }
};
