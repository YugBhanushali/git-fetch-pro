import { Button } from "@/components/ui/button";
import Image from "next/image";
import Downloader from "./Downloader";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-screen p-5">
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center mt-20 w-full">
        <Downloader />
      </div>
    </main>
  );
}
