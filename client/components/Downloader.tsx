"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { FiDownload, FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "sonner";

const parseGitHubUrl = (url: string) => {
  const urlParts = url.split("/");

  if (urlParts.length < 7) {
    return null; // Not enough parts to be a valid URL
  }

  const owner = urlParts[3];
  const repo = urlParts[4];
  const branch = urlParts[6];
  const path = urlParts.slice(7).join("/");
  const baseFolderName = urlParts[urlParts.length - 1];

  return { owner, repo, branch, path, baseFolderName };
};

const handleUrlValidation = (url: string) => {
  const parsedUrl = parseGitHubUrl(url);

  if (!parsedUrl || !parsedUrl.owner || !parsedUrl.repo || !parsedUrl.branch) {
    return false;
  }

  return true;
};

function Downloader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showNpx, setShowNpx] = useState(false);
  const [npxCopied, setNpxCopied] = useState(false);

  const apiUrl = "https://git-fetch-pro.onrender.com/api/download";

  useEffect(() => {
    if (handleUrlValidation(url) && url != "") {
      setShowNpx(url.trim() !== "");
    } else {
      setShowNpx(false);
    }
  }, [url]);

  const truncateUrl = (fullUrl: string) => {
    return fullUrl.length > 15 ? `${fullUrl.slice(0, 20)}...` : fullUrl;
  };

  const handleDownload = async () => {
    if (!handleUrlValidation(url)) {
      toast.error(
        "Invalid URL format. Please use the correct format: https://github.com/{owner}/{repo}/tree/{branch}"
      );
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        apiUrl,
        { url },
        {
          responseType: "blob",
        }
      );

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${url.split("/").pop()}.zip`);
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      if (response.data) {
        setIsLoading(false);
        toast.success(`${url.split("/").pop()}.zip downloaded successfully`);
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.status === 429) {
        setError("Too many requests. Please try again later.");
        toast.error("Too many requests. Please try again later.");
      } else {
        setError("Error downloading folder. Please check your URL.");
        toast.error("Error downloading folder. Please check your URL.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCurl = () => {
    if (!handleUrlValidation(url)) {
      toast.error(
        "Invalid URL format. Please use the correct format: https://github.com/{owner}/{repo}/tree/{branch}"
      );
      return;
    }
    const fileName = `${url.split("/").pop()}.zip`;
    const curlCommand = `curl --location '${apiUrl}' \\\n--header 'Content-Type: application/json' \\\n--data '{"url": "${url}"}' \\\n--output ${fileName}`;
    navigator.clipboard
      .writeText(curlCommand)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reset after 3 seconds
      })
      .catch((err) => {
        console.error("Failed to copy CURL command: ", err);
      });
  };

  const handleCopyNpx = () => {
    const npxCommand = `npx gitfetchpro ${url}`;
    navigator.clipboard
      .writeText(npxCommand)
      .then(() => {
        setNpxCopied(true);
        toast.success("npx command copied to clipboard!");
        setTimeout(() => setNpxCopied(false), 3000); // Reset after 3 seconds
      })
      .catch((err) => {
        console.error("Failed to copy npx command: ", err);
      });
  };

  return (
    <div className="flex flex-col w-full lg:w-[50%] items-center justify-center bg-white z-20 bg-opacity-10">
      <Input
        type="url"
        placeholder="https://github.com/YugBhanushali/git-fetch-pro/tree/main/client/app"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="flex gap-x-2 mt-6">
        <Button
          className="rounded-lg w-[180px] text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3"
          onClick={handleDownload}
          disabled={isLoading}
        >
          {isLoading ? (
            <RotatingLines
              visible={true}
              width="20"
              strokeWidth="2"
              strokeColor="white"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            <div className="flex gap-x-2 justify-center items-center">
              <FiDownload size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />{" "}
              Download
            </div>
          )}
        </Button>
        <Button
          className="rounded-lg w-[180px] transition-transform duration-200 text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3"
          onClick={handleCopyCurl}
          variant={"outline"}
        >
          {copied ? (
            <div className="flex gap-x-2 justify-center items-center">
              <FiCheck size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />{" "}
              Copied!
            </div>
          ) : (
            <div className="flex gap-x-2 justify-center items-center">
              <FiCopy size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> Copy
              CURL
            </div>
          )}
        </Button>
      </div>

      {showNpx && (
        <div className="mt-6 w-full flex justify-center">
          <Button
            className="rounded-lg transition-transform duration-200 text-xs sm:text-sm lg:text-sm py-1 sm:py-2 lg:py-3"
            onClick={handleCopyNpx}
            variant={"outline"}
          >
            <div className="flex w-full gap-x-2 justify-between items-center px-1">
              <FiCopy size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              npx gitfetchpro {truncateUrl(url)}
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Downloader;
