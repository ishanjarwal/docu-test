"use client";
import React from "react";
import Preview from "./Preview";
import { useSearchParams } from "next/navigation";
import PreviewHeader from "./PreviewHeader";
import { cn } from "@/lib/utils";

const PreviewModal = () => {
  const searchParams = useSearchParams();
  const previewParam = searchParams.get("preview");

  return previewParam === "true" ? (
    <div className="fixed left-0 top-0 z-[2] h-full min-h-screen w-full">
      <div
        className={cn(
          "h-full overflow-y-auto bg-background-muted scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
        )}
      >
        <PreviewHeader />
        <div className="px-4 pb-4 pt-24">
          <Preview className="bg-background/90 backdrop-blur-lg" />
        </div>
      </div>
    </div>
  ) : null;
};

export default PreviewModal;
