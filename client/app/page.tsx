import Downloader from "@/components/Downloader";
import Navbar from "@/components/Navbar";
import GridPattern from "@/components/animated-grid-pattern";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Instruction from "@/components/Instruction";
import { Toaster, toast } from "sonner";
import Head from "next/head";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen p-2 sm:p-4">
      <Head>
        <link rel="shortcut icon" href="/logo.png" sizes="any" />
      </Head>
      <div className={`${jetBrainsMono.className}`}>
        <Navbar />
      </div>
      <div className="relative flex-grow flex flex-col w-full items-center sm:mt-[10%] mt-[50%] overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="mb-4 sm:mb-6 bg-white z-20">
          <Instruction />
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-y-2 sm:gap-y-4">
          <h1
            className={`${jetBrainsMono.className} font-black text-2xl sm:text-3xl md:text-4xl lg:text-3xl text-center max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl`}
          >
            Download Files and Directories from GitHub with Ease
          </h1>

          <div className="flex w-full items-center justify-center mb-6 sm:mb-8">
            <Downloader />
          </div>
        </div>
      </div>
      <GridPattern
        width={30}
        height={30}
        maxOpacity={0.08}
        x={-1}
        y={-1}
        strokeDasharray={"6 3"}
        className={cn(
          "[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
        )}
      />
      <Footer />
      <Toaster position="top-center" />
    </main>
  );
}
