import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import userRoutes from "./routes/user.routes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Routes
// app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello Mahfujul 🚀 Backend is running!");
});

app.post("/", (req, res) => {
  
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
