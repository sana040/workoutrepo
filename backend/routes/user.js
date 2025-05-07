import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import Users from "../models/usermodel.js";

const router = express.Router();
const secret = "hfdg341C@13SAD#@!";

// Generate JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, secret, { expiresIn: "2d" });
};

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync();

  try {
    // Validation
    if (!email || !password) {
      throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error(
        "Password is not strong enough. Use at least one uppercase, lowercase, number, and special character (e.g., FGDsas12@)"
      );
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await Users.create({ email, password: hashedPassword });

    const token = createToken(newUser._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields must be filled");
    }

    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("Incorrect email");
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
