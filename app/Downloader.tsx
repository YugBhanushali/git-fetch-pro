"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { FiDownload, FiCopy, FiCheck } from "react-icons/fi";

function Downloader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/download",
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
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error downloading folder. Please check your URL.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCurl = () => {
    const fileName = `${url.split("/").pop()}.zip`;
    const curlCommand = `curl --location 'https://gitfetchpro.vercel.app/api/download' \\\n--header 'Content-Type: application/json' \\\n--data '{"url": "${url}"}' \\\n--output ${fileName}`;
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
    <div className="flex flex-col w-[50%] items-center justify-center bg-white z-20 bg-opacity-10">
      <Input
        type="text"
        placeholder="https://github.com/YugBhanushali/github-downloader-nextjs"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className=" sm:w-full "
      />
      <div className="flex gap-x-2 mt-6 ">
        <Button
          className=" rounded-lg w-[180px] sm:text-[14px] text-[12px]"
          onClick={handleDownload}
          disabled={isLoading}
        >
          {isLoading ? (
            <RotatingLines
              visible={true}
              width="26"
              strokeWidth="2"
              strokeColor="white"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            <div className="flex gap-x-2 justify-center items-center">
              <FiDownload size={18} /> Download
            </div>
          )}
        </Button>
        <Button
          className=" rounded-lg w-[180px]  transition-transform  duration-200 sm:text-[14px] text-[12px]"
          onClick={handleCopyCurl}
          // disabled={copied}
          variant={"outline"}
        >
          {copied ? (
            <div className="flex gap-x-2 justify-center items-center">
              <FiCheck size={18} /> Copied!
            </div>
          ) : (
            <div className="flex gap-x-2 justify-center items-center">
              <FiCopy size={18} /> Copy CURL
            </div>
          )}
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Downloader;
