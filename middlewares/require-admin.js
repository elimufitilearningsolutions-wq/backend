

export const requireAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ errorMessage: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        const [userId, isAdmin] = decoded.payload;

        if (!isAdmin) {
            return res.status(403).json({ errorMessage: "Admin access required" });
        }

        req.userId = userId;
        req.isAdmin = isAdmin;

        next();
    } catch (error) {
        return res.status(401).json({ errorMessage: "Invalid or expired token" });
    }
};
