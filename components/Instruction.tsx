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
        <Button variant="outline" className=" rounded-xl px-5 m-0 h-6">
          How to Use
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full">
        <DialogHeader>
          <DialogTitle>How to Use Git Fetch Pro</DialogTitle>
        </DialogHeader>
        <hr />
        <div className="flex flex-col items-center justify-center py-4 px-5 w-full">
          <ol className="list-decimal px-6 space-y-2">
            <li>Copy the URL of the specific file or directory from GitHub.</li>
            <li>Paste the URL into the input field below.</li>
            <li>Click the "Download" button to get your files.</li>
            <li>
              Alternatively, use the "Copy cURL" button to get a command you can
              run anywhere.
            </li>
          </ol>
          <div className="flex flex-col">
            <p className="mt-4">Example Repo URL:</p>
            <code className=" bg-gray-100 p-2 rounded mt-2 text-sm">
              https://github.com/supabase/supabase/tree/master/i18n
            </code>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Instruction;
