import generateSrc from "./src/generateSrc.js";
import executeCode from "./src/executeCode.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { registerUser } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import { authenticateMiddleware } from "./middleware/auth.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
const app = express();
dotenv.config();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["compilecraft"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
// API route for login
app.use("/auth", authRoutes);
// Middleware for authorization at '/authorized' route
// API route for user registration
app.post("/auth/register", registerUser);

// Handling Forgot Password post request
// app.post("/auth/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email: email }).then(async (user) => {
//       if (!user) return res.json({ msg: "User does not exist" });
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_STRING, {
//         expiresIn: "Id",
//       });

//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "sharmanikhil12jv@gmail.com",
//           pass: "",
//         },
//       });

//       const mailOptions = {
//         from: "sharmanikhil12jv@gmail.com",
//         to: email,
//         subject: "Reset your password!",
//         text: "http://localhost:5000/",
//       };

//       const info = await transporter.sendMail(mailOptions);
//       console.log("Email sent:", info.response);
//     });
//   } catch (error) {
//     res.status(500).json({ err: error });
//   }
// });

app.get("/authorized", authenticateMiddleware, (req, res) => {
  res.json({ msg: "You are authorized" });
});
// Main app route
app.get("/cppcraft", authenticateMiddleware, (req, res) => {
  return res.json({ name: "cppcraft app accessed" });
});

// Database Handling (Mongoose)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Terminate the application on connection error
  });

// Root route
app.get("/", (req, res) => {
  return res.json({ name: "compilercraft" });
});

// API route for code execution
app.post("/run", async (req, res) => {
  try {
    // Extract language and source code from the request body
    const { lang = "cpp", src_code } = req.body;

    // Check if source code is provided
    if (src_code === undefined) {
      return res
        .status(400)
        .json({ success: false, error: "Empty source code found!" });
    }

    // Generate a source file and execute the code
    const filepath = await generateSrc(lang, src_code);

    const output = await executeCode(filepath);

    // Send response to the client
    return res.json({ filepath, output });
  } catch (error) {
    console.error("Error in /run endpoint:", error);

    // Send an error response to the client
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});
