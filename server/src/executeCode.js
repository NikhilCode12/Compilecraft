import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFilePath = path.join(__dirname, "outputs");

const ensureDirExists = async (dir) => {
  try {
    await fs.access(dir);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
    } else {
      throw error;
    }
  }
};

const executeCode = async (filepath) => {
  try {
    await ensureDirExists(outputFilePath);
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputFilePath, `${jobId}.out`);

    // Compilation command
    const compileCommand = `g++ ${filepath} -o ${outPath}`;

    // Execution command
    const executeCommand = path.join(outputFilePath, `./${jobId}.out`);

    // Execute compilation and then run the binary
    return new Promise((resolve, reject) => {
      exec(compileCommand, (compileError) => {
        if (compileError) {
          reject(compileError);
        } else {
          exec(executeCommand, (executeError, stdout, stderr) => {
            if (executeError) {
              reject(executeError);
            } else if (stderr) {
              reject(stderr);
            } else {
              resolve(stdout);
            }
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in executeCode:", error);
    throw error;
  }
};

export default executeCode;
