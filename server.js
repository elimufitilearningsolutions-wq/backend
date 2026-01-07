import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { prePriRouter } from "./routes/pre_primary.js";
import { priRouter } from "./routes/primary.js";
import { jssRouter } from "./routes/jss.js";
import { secRouter } from "./routes/secondary.js";
import { mpesaRouter } from "./routes/mpesaRoute.js";
import { userDataRoute } from "./routes/userDataRoute.js";
import { subscriptionRouter } from "./routes/subscription.js";
import { applicantsRouter } from "./routes/applicants.js";
// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 8001;
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser()); // Parse cookies

// CORS Configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://elimufiti.co.ke', 'https://www.elimufiti.co.ke']  // Allow subdomains in production
    : process.env.CORS_ORIGIN?.split(',') || [];  // Allow multiple origins in development

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like Postman or server-to-server requests)
        if (process.env.NODE_ENV !== 'production' || allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.log(`Blocked CORS request from: ${origin}`);  // Log blocked requests for debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  // Enable credentials (cookies, authorization headers)
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));


// Routes
app.use("/api", authRouter);
app.use("/applicants", applicantsRouter);
app.use("/pre/primary", prePriRouter);
app.use("/primary", priRouter);
app.use("/jss", jssRouter);
app.use("/secondary", secRouter);
app.use("/api/transactions", mpesaRouter);
app.use("/user/data", userDataRoute);
app.use("/api/subscriptions", subscriptionRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
