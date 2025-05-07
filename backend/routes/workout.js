import express from "express";
import mongoose from "mongoose";
import requireAuth from "../middleware/requireaauth.js";
import workoutmodel from "../models/workoutmodel.js";

const router = express.Router();

// Protect all routes with auth middleware
router.use(requireAuth);

// GET all workouts for a user
router.get("/", async (req, res) => {
  const user_id = req.user._id;

  try {
    const workouts = await workoutmodel
      .find({ user_id })
      .sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET a single workout by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  try {
    const workout = await workoutmodel.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST a new workout
router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  const emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  try {
    const user_id = req.user._id;
    const workout = await workoutmodel.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a workout
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  try {
    const workout = await workoutmodel.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
