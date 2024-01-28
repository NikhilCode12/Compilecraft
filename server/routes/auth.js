import express from "express";
import { loginUser } from "../controllers/auth.js";
import passport from "../src/googleOauth.js";
import session from "express-session";

const router = express.Router();

router.use(
  session({
    secret: "kasjlfkajsdalkfjaslkdfjkalsnkgahklsdfnsl12312",
    resave: true,
    saveUninitialized: true,
  })
);

router.post("/login", (req, res) => {
  //   console.log("Login end point accessed!");
  loginUser(req, res);
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ error: false, msg: "Logged in successfully!", user: req.user });
  } else {
    res.status(403).json({ error: true, msg: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, msg: "Login Failed!" });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

export default router;
