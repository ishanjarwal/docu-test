"use client";
import React from "react";
// import { ResumeDataContext } from "../providers/ResumeData";
// import ATSTemplate1 from "@/features/templates/ats/ATSTemplate1";

import useDimensions from "@/hooks/useDimensions";
import clsx from "clsx";

const Preview = ({ className }: { className?: string }) => {
  // const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const containerRef = React.useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLElement>;
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={clsx(
        "bg-background-muted h-full overflow-y-auto scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
        className,
      )}
    >
      <div className="h-fit px-4 pb-4 pt-8">
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="mx-auto aspect-[210/297] max-w-xl bg-white shadow-lg"
        >
          <div
            style={{
              zoom: (1 / 794) * width,
            }}
          >
            <h1 className="text-3xl">Hello World</h1>
            {/* <ATSTemplate1
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                /> */}
          </div>
        </div>
      </div>

      {/* <pre>{JSON.stringify(resumeData, null, 2)}</pre> */}
    </div>
  );
};

export default Preview;
