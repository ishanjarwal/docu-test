"use client";
import React, { useContext } from "react";
import { ResumeDataContext } from "../providers/ResumeData";
import ATSTemplate1 from "@/features/templates/ats/ats_template_1/ATSTemplate1";

import useDimensions from "@/hooks/useDimensions";
import clsx from "clsx";
import ThemeBar from "./ThemeBar";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { templates } from "../constants/templates";
import useTemplate from "@/features/templates/useTemplate";

const Preview = ({ className }: { className?: string }) => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const searchParams = useSearchParams();
  const isPreviewOpen = searchParams.get("preview") == "true";

  const removePreviewParam = () => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete("preview");
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const containerRef = React.useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLElement>;
  const { width } = useDimensions(containerRef);

  const Template = useTemplate(resumeData);

  return (
    <div
      className={clsx(
        "h-full overflow-y-auto bg-background-muted scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
        className,
      )}
    >
      <nav
        className={cn(
          "flex h-16 items-center justify-between border-b border-border bg-background-muted px-4",
          isPreviewOpen && "fixed top-0 w-full",
        )}
      >
        <ThemeBar />
        {isPreviewOpen && (
          <Button
            onClick={removePreviewParam}
            variant={"outline"}
            size={"icon"}
          >
            <IoMdClose />
          </Button>
        )}
      </nav>
      <div className={cn("h-fit px-4 pb-4 pt-8", isPreviewOpen && "pt-24")}>
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "mx-auto aspect-[210/297] max-w-xl bg-white shadow-2xl",
            isPreviewOpen && "max-w-4xl",
          )}
        >
          <div
            // className="h-full"
            style={{
              zoom: (1 / 794) * width,
            }}
          >
            <Template resumeData={resumeData} setResumeData={setResumeData} />
          </div>
        </div>
      </div>

      {/* <pre>{JSON.stringify(resumeData, null, 2)}</pre> */}
    </div>
  );
};

export default Preview;
