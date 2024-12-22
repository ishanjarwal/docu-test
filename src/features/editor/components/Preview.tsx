"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import React, { useContext, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { PreviewToggleContext } from "../providers/PreviewToggle";

const Preview = () => {
  const { previewOpen, setPreviewOpen } = useContext(PreviewToggleContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setPreviewOpen(true);
      } else {
        setPreviewOpen(false);
      }
    };

    // handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      {previewOpen ? (
        <div
          className={clsx(
            "fixed w-full flex-1 overflow-y-auto bg-card/50 backdrop-blur-sm lg:relative lg:bg-card",
            "h-full scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50 lg:h-full",
          )}
        >
          <Button
            onClick={() => setPreviewOpen(false)}
            variant={"secondary"}
            className="sticky left-full top-2 me-2 flex lg:hidden"
          >
            Close
            <IoMdClose />
          </Button>
          {Array.from({ length: 100 }).map((_, i) => (
            <br key={i} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Preview;
