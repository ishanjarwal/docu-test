"use client";
import React, { useEffect } from "react";
import Preview from "./Preview";
import { useSearchParams } from "next/navigation";
import PreviewHeader from "./PreviewHeader";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";

const PreviewModal = () => {
  const searchParams = useSearchParams();
  const previewParam = searchParams.get("preview");

  const removePreviewParam = () => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete("preview");
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    if (previewParam == "true") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [previewParam]);

  return (
    <AnimatePresence>
      {previewParam === "true" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed left-0 top-0 z-[51] h-full min-h-screen w-full"
        >
          <div
            className={cn(
              "relative h-full overflow-y-auto bg-background-muted/50 backdrop-blur-sm scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
            )}
          >
            <Button
              className="absolute right-4 top-4 bg-foreground text-background hover:bg-foreground hover:text-background hover:brightness-75"
              onClick={removePreviewParam}
              variant={"secondary"}
            >
              <IoMdClose />
              Close
            </Button>
            {/* <PreviewHeader /> */}
            <div className="px-4 pb-4 pt-16 lg:pt-24">
              <Preview className="bg-background/90 backdrop-blur-lg" />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default PreviewModal;
