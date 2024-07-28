import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaRegFileCode } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full border border-1 rounded-2xl p-3">
      {/* logo and name */}
      <div className="flex gap-x-2 items-center justify-center">
        <div>
          <FaRegFileCode size={25} />
        </div>
        <div className="flex font-semibold text-[20px]">Git Fetch Pro</div>
      </div>
      {/* github */}
      <div>
        <FaGithub size={25} />
      </div>
    </div>
  );
};

export default Navbar;
