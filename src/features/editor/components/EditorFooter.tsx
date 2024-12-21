"use client";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";

import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { PreviewToggleContext } from "../providers/PreviewToggle";

const EditorFooter = () => {
  const { previewOpen, setPreviewOpen } = useContext(PreviewToggleContext);

  return (
    <div className="flex w-full items-center justify-between border-t p-4">
      <div className="flex items-center justify-start space-x-2">
        <Button
          className="px-2 py-1 text-xs lg:px-4 lg:py-2 lg:text-sm"
          variant={"outline"}
        >
          <IoMdArrowBack />
          <span className="hidden lg:block">Back</span>
        </Button>
        <Button className="bg-foreground px-2 py-1 text-xs hover:bg-foreground/90 lg:px-4 lg:py-2 lg:text-sm">
          <span className="hidden lg:block">Next</span>
          <IoMdArrowForward />
        </Button>
      </div>
      <div className="flex items-center justify-start space-x-2">
        <Button
          className="py-1 text-xs lg:px-4 lg:py-2 lg:text-sm"
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button
          onClick={() => setPreviewOpen((prev: boolean) => !prev)}
          className="py-1 text-xs lg:px-4 lg:py-2 lg:text-sm"
          variant={"secondary"}
        >
          {!previewOpen ? "Preview" : "Close"}
        </Button>
        <p>Saving . . .</p>
      </div>
    </div>
  );
};

export default EditorFooter;
