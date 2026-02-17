import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

// Routers
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
import { collegeRouter } from "./routes/college.js";

import { poolUsers } from "./db.js"; // DB connection

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

/* =======================
   CORS CONFIGURATION
======================= */
// Allowed origins
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://elimufiti.co.ke", "https://www.elimufiti.co.ke", "https://api.elimufiti.co.ke"]
    : process.env.CORS_ORIGIN?.split(",") || [];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Normalize origin (remove trailing slash)
    const cleanedOrigin = origin?.replace(/\/$/, "");

    // Allow if origin is in allowedOrigins or if running locally (no origin)
    if (
      process.env.NODE_ENV !== "production" ||
      allowedOrigins.includes(cleanedOrigin) ||
      !origin
    ) {
      callback(null, true);
    } else {
      console.log(`Blocked CORS request from: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // include OPTIONS for preflight
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // allow cookies/auth if needed
};

// Apply CORS globally
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* =======================
   BODY PARSERS
======================= */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

/* =======================
   ROUTES
======================= */
app.use("/api", authRouter);
app.use("/applicants", applicantsRouter);
app.use("/pre/primary", prePriRouter);
app.use("/primary", priRouter);
app.use("/jss", jssRouter);
app.use("/senior/school", seniorSchoolRouter);
app.use("/secondary", secRouter);
app.use("/college", collegeRouter);
app.use("/api/transactions", mpesaRouter);
app.use("/user/data", userDataRoute);
app.use("/api/subscriptions", subscriptionRouter);

/* =======================
   ERROR HANDLER
======================= */
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

/* =======================
   HTTP SERVER + SOCKET.IO
======================= */
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://elimufiti.co.ke", "https://www.elimufiti.co.ke", "https://api.elimufiti.co.ke"]
        : true,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

/* =======================
   SOCKET.IO HANDLERS
======================= */
io.on("connection", (socket) => {
  console.log("🔥 Socket connected:", socket.id);

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`User ${roomName} joined room`);
    // No automatic DB fetch here
  });

  socket.on("disconnect", () => console.log("❌ Socket disconnected:", socket.id));
});


/* =======================
   START SERVER
======================= */
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});
