"use client";
import { Button } from "@/components/ui/button";
import useTemplate from "@/features/templates/currentTemplate";
import useDimensions from "@/hooks/useDimensions";
import { resumeSchemaType } from "@/validations/validation";
import React, { useEffect, useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useReactToPrint } from "react-to-print";

const ResumePreview = ({ resumeData }: { resumeData: resumeSchemaType }) => {
  // const [loading, setLoading] = useState(false);
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
  // const handlePrint = async () => {
  //   try {
  //     setLoading(true);
  //     if (!containerRef.current || !outputRef.current) return;
  //     const previewer = new Previewer();
  //     // Run Paged.js in memory (without rendering)
  //     const result = await previewer.preview(
  //       containerRef.current.innerHTML,
  //       ["/pagedjs.css"],
  //       document.getElementById("output")?.innerHTML,
  //     );
  //     console.log("Paged.js finished processing");
  //     // Get the paged content
  //     const pages = result.pages;
  //     if (!pages || pages.length === 0) {
  //       console.error("No pages generated!");
  //       return;
  //     }
  //     // Create PDF
  //     const pdf = new jsPDF("p", "px", [794, 1122]); // A4 size
  //     for (let i = 0; i < pages.length; i++) {
  //       // Convert each page into an image using html2canvas
  //       const element = pages[i].element;
  //       console.log(element);
  //       // element.querySelector(".wrapped_content").style.zoom = "1";
  //       const canvas = await html2canvas(element);
  //       const imgData = canvas.toDataURL("image/png");
  //       if (i > 0) pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, 0, 794, 1122);
  //       console.log(`Added page ${i + 1}`);
  //     }
  //     // Automatically download the PDF
  //     // pdf.save("document.pdf");
  //     const pdfBlob = pdf.output("blob");
  //     const pdfURL = URL.createObjectURL(pdfBlob);
  //     window.open(pdfURL, "_blank");
  //     console.log("PDF downloaded!");
  //   } catch (error) {
  //     console.error("Error during pagination:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   handlePrint();
  // }, []);

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
          {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
          <Template resumeData={resumeData} />
        </div>
      </div>
      <div id="output" ref={outputRef as React.RefObject<HTMLDivElement>}></div>
    </>
  );
};

export default ResumePreview;
