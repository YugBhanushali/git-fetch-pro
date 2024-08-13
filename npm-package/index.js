#!/usr/bin/env node

const { program } = require("commander");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const parseGitHubUrl = (url) => {
  const urlParts = url.split("/");
  const owner = urlParts[3];
  const repo = urlParts[4];
  const branch = urlParts[6] || "main";
  const folderPath = urlParts.slice(7).join("/");
  return { owner, repo, branch, folderPath };
};

const fetchFolderContents = async (owner, repo, branch, folderPath) => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const response = await axios.get(apiUrl);
  return response.data.tree.filter((item) => item.path.startsWith(folderPath));
};

const downloadFile = async (owner, repo, branch, filePath, outputPath) => {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
  const response = await axios.get(url, { responseType: "arraybuffer" });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(response.data));
};

program
  .version("1.0.0")
  .description("Clone specific folders from GitHub repositories")
  .argument("<url>", "GitHub URL of the folder to clone")
  .option("-o, --output <directory>", "Output directory", process.cwd())
  .action(async (url, options) => {
    try {
      const { owner, repo, branch, folderPath } = parseGitHubUrl(url);
      console.log(`Cloning ${folderPath} from ${owner}/${repo} (${branch})...`);

      const contents = await fetchFolderContents(
        owner,
        repo,
        branch,
        folderPath
      );

      for (const item of contents) {
        if (item.type === "blob") {
          const relativeFilePath = item.path.substring(folderPath.length);
          const outputFilePath = path.join(options.output, relativeFilePath);
          //   console.log(`Downloading: ${relativeFilePath}`);
          await downloadFile(owner, repo, branch, item.path, outputFilePath);
        }
      }

      console.log("Folder cloned successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
