"use client";
import currentTemplate from "@/features/templates/currentTemplate";
import useDimensions from "@/hooks/useDimensions";
import React, { useContext } from "react";
import { ResumeDataContext } from "../providers/ResumeData";

const Preview = ({ className }: { className?: string }) => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const containerRef = React.useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLElement>;
  const { width } = useDimensions(containerRef);
  const Template = currentTemplate(resumeData);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="mx-auto h-full max-w-3xl bg-white shadow-2xl"
      style={{ height: `${(297 / 210) * width}px` }}
    >
      <div
        className="select-none"
        id="resumePreviewContent"
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <Template resumeData={resumeData} setResumeData={setResumeData} />
      </div>
    </div>
  );
};

export default Preview;
