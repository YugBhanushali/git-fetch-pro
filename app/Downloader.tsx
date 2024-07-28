"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { FiDownload } from "react-icons/fi";

function Downloader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    } catch (error) {
      console.error("Error:", error);
      setError("Error downloading folder. Please check your URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex  flex-col w-[50%] items-center justify-center">
      <Input
        type="text"
        placeholder="https://github.com/YugBhanushali/github-downloader-nextjs"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button
        className="mt-6 rounded-lg w-[180px]"
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Downloader;
