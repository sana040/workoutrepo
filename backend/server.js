import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import WorkoutRouter from "./routes/workout.js";
import UserRouter from "./routes/user.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/workout", WorkoutRouter);
app.use("/user", UserRouter);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URL;

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
    console.log(`🚀 Server listening on port ${PORT}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
});
