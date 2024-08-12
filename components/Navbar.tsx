import Image from "next/image";
import React from "react";
import { FaGithub } from "react-icons/fa";
import gitfetch from "../public/logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full  p-2">
      {/* logo and name */}
      <div className="flex gap-x-2 items-center justify-center">
        <div>
          <Image
            src={gitfetch}
            height={55}
            width={55}
            alt="git fetch pro"
            className="m-0 p-0"
          />
        </div>
        <div className="flex font-bold text-[20px]">Git Fetch Pro</div>
      </div>
      {/* github */}
      <div>
        <FaGithub size={25} />
      </div>
    </div>
  );
};

export default Navbar;
