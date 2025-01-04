"use client";
import React from "react";
import Preview from "./Preview";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";

const PreviewModal = () => {
  const removePreviewParam = () => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete("preview");
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  return (
    <div className="fixed left-0 top-0 z-[1000] h-full min-h-screen w-full">
      <Preview className="bg-foreground/25 backdrop-blur-sm" />
      <Button
        onClick={removePreviewParam}
        variant={"secondary"}
        className="absolute right-4 top-4"
      >
        Close
        <IoMdClose />
      </Button>
    </div>
  );
};

export default PreviewModal;
