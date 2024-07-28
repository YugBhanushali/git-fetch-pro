import { Button } from "@/components/ui/button";
import Image from "next/image";
import Downloader from "./Downloader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Downloader />
    </main>
  );
}
