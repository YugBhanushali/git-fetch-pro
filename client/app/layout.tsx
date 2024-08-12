import type { Metadata } from "next";
import { Inter, Source_Code_Pro, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const robotoMono = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Git Fetch Pro",
  description: "Download the files and folders from the github repo with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>{children}</body>
    </html>
  );
}
