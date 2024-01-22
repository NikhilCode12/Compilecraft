// Entry-point for CompileCraft Backend
import express from "express";
import generateSrc from "./generateSrc.js";
import executeCode from "./executeCode.js";

const app = express();
const port = 5000;

// Body parser to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ name: "compilercraft" });
});

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
    // console.log("Generated source file at:", filepath);

    const output = await executeCode(filepath);
    // console.log("Code execution successful. Output:", output);

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
