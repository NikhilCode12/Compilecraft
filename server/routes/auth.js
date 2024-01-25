import express from "express";
import { loginUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", (req, res) => {
  //   console.log("Login end point accessed!");
  loginUser(req, res);
});

export default router;
