"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { FiDownload, FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "sonner";

function Downloader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const apiUrl = "https://git-fetch-pro.onrender.com/api/download";

  const handleDownload = async () => {
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

  return (
    <div className="flex flex-col w-full lg:w-[50%] items-center justify-center bg-white z-20 bg-opacity-10">
      <Input
        type="text"
        placeholder="https://github.com/YugBhanushali/github-downloader-nextjs"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        // className="w-full lg:w-auto text-sm lg:text-base"
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
    </div>
  );
}

export default Downloader;
