"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div>
      <h1>GitHub Folder Downloader</h1>
      <Input
        type="text"
        placeholder="Paste GitHub Directory URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={handleDownload} disabled={isLoading}>
        {isLoading ? "Downloading..." : "Download Folder"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Downloader;
