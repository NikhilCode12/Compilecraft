import generateSrc from "./src/generateSrc.js";
import executeCode from "./src/executeCode.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser } from "./controllers/auth.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

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

// API route for user registration
app.post("/auth/register", registerUser);

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
