"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const Instruction = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-xl px-3 sm:px-5 h-8 sm:h-10 font-semibold text-xs sm:text-sm"
        >
          How to Use
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-[90vw] max-w-[500px] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            How to Use Git Fetch Pro
          </DialogTitle>
        </DialogHeader>
        <hr />
        <div className="flex flex-col items-start justify-center py-3 sm:py-4 px-3 sm:px-5 w-full">
          <ol className="list-decimal pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>Copy the URL of the specific file or directory from GitHub.</li>
            <li>Paste the URL into the input field below.</li>
            <li>Click the "Download" button to get your files.</li>
            <li>
              Alternatively, use the "Copy cURL" button to get a command you can
              run anywhere.
            </li>
          </ol>
          <div className="flex flex-col w-full mt-3 sm:mt-4">
            <p className="text-sm sm:text-base">Example Repo URL:</p>
            <code className="bg-gray-100 p-2 rounded mt-1 sm:mt-2 text-xs sm:text-sm break-all">
              https://github.com/supabase/supabase/tree/master/i18n
            </code>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Instruction;
