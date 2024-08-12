import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import JSZip from "jszip";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
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

    const zipBuffer = await zip.generateAsync({ type: "uint8array" });

    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${baseFolderName}.zip`,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error fetching folder contents. Please check your URL." },
      { status: 500 }
    );
  }
}

function parseGitHubUrl(url: string) {
  const urlParts = url.split("/");
  const owner = urlParts[3];
  const repo = urlParts[4];
  const branch = urlParts[6];
  const path = urlParts.slice(7).join("/");
  const baseFolderName = urlParts[urlParts.length - 1];
  return { owner, repo, branch, path, baseFolderName };
}

async function fetchFolderContents(
  owner: string,
  repo: string,
  branch: string,
  basePath: string,
  tree: any[],
  zip: JSZip
) {
  const fileUrls = tree
    .filter(
      (item: any) => item.type === "blob" && item.path.startsWith(basePath)
    )
    .map((item: any) => item.path);

  await Promise.all(
    fileUrls.map(async (fileUrl: string) => {
      const response = await axios.get(
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${fileUrl}`,
        {
          responseType: "arraybuffer",
        }
      );
      console.log(response, "test");
      const filePath = fileUrl.substring(basePath.length);
      zip.file(filePath, response.data);
    })
  );
}
