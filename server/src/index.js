import express from "express";
import axios from "axios";
import JSZip from "jszip";
import cors from "cors";
import pLimit from "p-limit";
import { limiter } from "./middleware/ratelimiting.js";
import morgan from "morgan";

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(limiter);
app.use(morgan("dev"));

// Parse GitHub URL
const parseGitHubUrl = (url) => {
  const urlParts = url.split("/");
  const owner = urlParts[3];
  const repo = urlParts[4];
  const branch = urlParts[6];
  const path = urlParts.slice(7).join("/");
  const baseFolderName = urlParts[urlParts.length - 1];
  return { owner, repo, branch, path, baseFolderName };
};

// Fetch folder contents and add to zip
const fetchFolderContents = async (
  owner,
  repo,
  branch,
  basePath,
  tree,
  zip
) => {
  const fileUrls = tree
    .filter((item) => item.type === "blob" && item.path.startsWith(basePath))
    .map((item) => item.path);

  const limit = pLimit(100); // Limit to 5 concurrent requests

  const downloadPromises = fileUrls.map((fileUrl) =>
    limit(async () => {
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${fileUrl}`,
          {
            responseType: "arraybuffer",
            timeout: 30000, // 30 seconds timeout
          }
        );

        // console.log(response.config.url, "downloaded");

        const filePath = fileUrl.substring(basePath.length);

        if (fileUrl.endsWith(".json")) {
          const fileContent = new TextDecoder().decode(response.data);
          zip.file(filePath, fileContent);
        } else {
          zip.file(filePath, response.data);
        }
      } catch (error) {
        console.error(`Error fetching ${fileUrl}:`, error.message);
        // You might want to add this file to a list of failed downloads
      }
    })
  );

  await Promise.all(downloadPromises);
};
// Define the route that triggers the zip download
app.post("/api/download", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send("GitHub URL is required");
  }

  try {
    const { owner, repo, branch, path, baseFolderName } = parseGitHubUrl(url);

    if (!owner || !repo || !branch || !path || !baseFolderName) {
      throw new Error("Invalid GitHub URL");
    }

    const treeResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
    );
    const tree = treeResponse.data.tree;

    const zip = new JSZip();
    await fetchFolderContents(owner, repo, branch, path, tree, zip);

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${baseFolderName}.zip"`
    );

    const zipStream = zip.generateNodeStream({
      type: "nodebuffer",
      streamFiles: true,
    });

    zipStream.pipe(res);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send("Error fetching folder contents. Please check your URL.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
