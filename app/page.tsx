import Downloader from "./Downloader";
import Navbar from "@/components/Navbar";
import GridPattern from "@/components/animated-grid-pattern";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Instruction from "@/components/Instruction";

const sourceCodePro = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen p-2">
      <div className={`${sourceCodePro.className}`}>
        <Navbar />
      </div>
      <div className="relative flex-grow flex flex-col w-full items-center justify-center overflow-hidden p-10">
        <div className="mb-6">
          <Instruction />
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-y-2">
          <div
            className={`${sourceCodePro.className} font-black lg:text-4xl sm:text-4xl md:text-4xl text-center max-w-3xl`}
          >
            Download Files and Directories from GitHub with Ease
          </div>
          <p className="text-center text-[0.80rem] max-w-2xl mb-4">
            Git Fetch Pro simplifies the process of downloading specific files
            or subdirectories from GitHub repos without cloning the entire
            project.
          </p>

          <div className="flex w-full items-center justify-center mb-8">
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
    </main>
  );
}
