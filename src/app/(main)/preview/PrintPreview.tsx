"use client";
import { Button } from "@/components/ui/button";
import useTemplate from "@/features/templates/currentTemplate";
import useDimensions from "@/hooks/useDimensions";
import { resumeSchemaType } from "@/validations/validation";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useReactToPrint } from "react-to-print";

const ResumePreview = ({ resumeData }: { resumeData: resumeSchemaType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  const saver = useReactToPrint({
    contentRef: containerRef,
    documentTitle: resumeData.title || "Resume",
    pageStyle: `
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background-color: ${resumeData.template.backdropHex} !important;
      }
      @page {
        size: A4;
        padding: 3mm 0mm 3mm 0mm;
        margin: 0mm;
        background-color: ${resumeData.template.backdropHex} !important;
        @top-left-corner {
          content: "";
        }
        @top-left {
          content: "";
        }
        @top-center {
          content: "";
        }
        @top-right {
          content: "";
        }
        @top-right-corner {
          content: "";
        }
        @left-top {
          content: "";
        }
        @left-middle {
          content: "";
        }
        @left-bottom {
          content: "";
        }
        @right-top {
          content: "";
        }
        @right-middle {
          content: "";
        }
        @right-bottom {
          content: "";
        }
        @bottom-left-corner {
          content: "";
        }
        @bottom-left {
          content: "";
        }
        @bottom-center {
          content: "";
        }
        @bottom-right {
          content: "";
        }
        @bottom-right-corner {
          content: "";
        }
  }

  @page:first {
    size: A4;
    padding: 0mm 0mm 3mm 0mm;
  }

  @media print {
    #resumePreviewContent {
      zoom: 1 !important;
      padding: 0;
    }
    `,
  });

  const Template = useTemplate(resumeData);

  useEffect(() => {
    saver();
  }, [saver]);

  return (
    <>
      <div className="flex items-center justify-center">
        <Button onClick={() => saver()} className="text-foreground">
          Save as PDF
          <MdOutlineFileDownload />
        </Button>
      </div>

      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        // style={{ display: "none" }}
        className={"mx-auto mt-4 max-w-3xl overflow-hidden bg-white"}
      >
        <div
          id="resumePreviewContent"
          style={{
            zoom: (1 / 794) * width,
          }}
        >
          <Template resumeData={resumeData} />
        </div>
      </div>
      <div
        id="output"
        className="flex flex-col gap-y-8"
        ref={outputRef as React.RefObject<HTMLDivElement>}
      ></div>
    </>
  );
};

export default ResumePreview;
