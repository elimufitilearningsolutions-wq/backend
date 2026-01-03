import jwt from"jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present and formatted correctly
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ errorMessage: "Authorization token not provided or malformed" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Extract userId from the payload
        const userId = decoded.payload?.userId; // Adjusted to access `payload.userId`

        if (!userId) {
            return res.status(401).json({ errorMessage: "Invalid token structure" });
        }

        // Set userId on the request object
        req.user = { id: userId };

        // Log the userId for debugging purposes
        //console.log("Authenticated user ID:", userId);

        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ errorMessage: "Invalid or expired token" });
    }
};

export default authenticateUser;
