import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-2 sm:py-4 fixed bottom-0 left-0 w-full bg-white bg-opacity-90">
      <div className="flex flex-col sm:flex-row items-center justify-between mx-auto px-4 text-center text-xs sm:text-sm text-gray-500">
        <p className="mb-2 sm:mb-0 text-center sm:text-left">
          Git Fetch Pro is not affiliated with or sponsored by GitHub.
        </p>
        <div className="flex gap-x-4 sm:gap-x-6">
          <p>
            <Link
              href="https://twitter.com/TheYug03"
              className="hover:underline hover:underline-offset-4"
            >
              Twitter
            </Link>
          </p>
          <p>
            <Link
              href="mailto:yug.h.bhanushali1@gmail.com"
              className="hover:underline hover:underline-offset-4"
            >
              Feedback
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
