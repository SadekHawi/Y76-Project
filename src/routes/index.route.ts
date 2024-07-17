import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// Read package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../package.json"), "utf8")
);

router.get("/", (req, res) => {
  res.json({ version: packageJson.version });
});

export default router;
