import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirSrcCodes = path.join(__dirname, "src_codes");

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

const generateSrc = async (lang_format, src_code) => {
  try {
    await ensureDirExists(dirSrcCodes);

    const jobId = v4();
    const file_name = `${jobId}.${lang_format}`;
    const file_path = path.join(dirSrcCodes, file_name);

    await fs.writeFile(file_path, src_code);

    return file_path;
  } catch (error) {
    console.error("Error in generateSrc:", error);
    throw error;
  }
};

export default generateSrc;
