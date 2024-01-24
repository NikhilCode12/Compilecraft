// authentication end-point controller
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generating salt and salting the password with bcrypt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // New user registeration and save it in db
    const newUser = new User({ email, password: passwordHash });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
