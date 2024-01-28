// authentication end-point controller
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";

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

// Logging User in
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.json({ msg: "User does not exist" });

    const matchPasswds = await bcrypt.compare(password, user.password);
    if (!matchPasswds) return res.json({ msg: "Invalid login credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_STRING);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
