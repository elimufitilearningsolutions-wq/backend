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
import { seniorSchoolRouter } from "./routes/seniorSchool.js";

dotenv.config();

const PORT = process.env.PORT || 8001;
const app = express();

/* =======================
   CORS CONFIG FIRST
======================= */

const allowedOrigins =
    process.env.NODE_ENV === 'production'
        ? ['https://elimufiti.co.ke', 'https://www.elimufiti.co.ke']
        : process.env.CORS_ORIGIN?.split(',') || [];

const corsOptions = {
    origin: (origin, callback) => {
        if (
            process.env.NODE_ENV !== 'production' ||
            allowedOrigins.includes(origin) ||
            !origin
        ) {
            callback(null, true);
        } else {
            console.log(`Blocked CORS request from: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

/* APPLY CORS BEFORE ANYTHING ELSE */
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/* =======================
   BODY PARSERS
======================= */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

/* =======================
   ROUTES
======================= */
app.use("/api", authRouter);
app.use("/applicants", applicantsRouter);
app.use("/pre/primary", prePriRouter);
app.use("/primary", priRouter);
app.use("/jss", jssRouter);
app.use("/senior/school", seniorSchoolRouter)
app.use("/secondary", secRouter);
app.use("/api/transactions", mpesaRouter);
app.use("/user/data", userDataRoute);
app.use("/api/subscriptions", subscriptionRouter);

/* =======================
   404
======================= */
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

/* =======================
   START SERVER
======================= */
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
