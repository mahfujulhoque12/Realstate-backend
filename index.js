import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.router.js";

import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS Setup (for local frontend)
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js frontend
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight OPTIONS requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes - ADD THIS LINE
app.use("/api/user", userRouter);
app.use("/api", authRouter);
app.use("/api/listing", listingRouter);

// ✅ Default route
app.get("/", (req, res) => {
  res.json("Hello World");
});

// ✅ Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
