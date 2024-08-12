import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 fixed bottom-0 left-0 w-full">
      <div className="flex items-center justify-between mx-auto px-4 text-center text-sm text-gray-500">
        <p> Git Fetch Pro is not affiliated with or sponsored by GitHub.</p>
        <div className="flex gap-x-2">
          <p>
            <Link
              href="https://twitter.com/TheYug03"
              className="hover:underline ml-1 hover:underline-offset-4"
            >
              Twitter
            </Link>
          </p>
          <p>
            <Link
              href="mailto:yug.h.bhanushali1@gmail.com"
              className="hover:underline ml-1 hover:underline-offset-4"
            >
              feedback
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
