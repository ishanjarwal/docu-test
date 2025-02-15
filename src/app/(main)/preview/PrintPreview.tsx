"use client";
import { Button } from "@/components/ui/button";
import { templates } from "@/features/editor/constants/templates";
import ATSTemplate1 from "@/features/templates/ats/ats_template_1/ATSTemplate1";
import ModernTemplate1 from "@/features/templates/modern/modern_template_1/ModernTemplate1";
import useTemplate from "@/features/templates/useTemplate";
import useDimensions from "@/hooks/useDimensions";
import { resumeSchemaType } from "@/validations/validation";
import React, { useRef } from "react";
// import { Previewer } from "pagedjs";
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
  });
  // const handlePrint = async () => {
  //   // try {
  //   //   setLoading(true);
  //   //   if (!containerRef.current || !outputRef.current) return;
  //   //   const previewer = new Previewer();
  //   //   // Run Paged.js in memory (without rendering)
  //   //   const result = await previewer.preview(
  //   //     containerRef.current.innerHTML,
  //   //     ["/pagedjs.css"],
  //   //     outputRef.current.innerHTML,
  //   //   );
  //   //   console.log("Paged.js finished processing");
  //   //   // // Get the paged content
  //   //   // const pages = result.pages;
  //   //   // if (!pages || pages.length === 0) {
  //   //   //   console.error("No pages generated!");
  //   //   //   return;
  //   //   // }
  //   //   // // Create PDF
  //   //   // const pdf = new jsPDF("p", "px", [794, 1122]); // A4 size
  //   //   // for (let i = 0; i < pages.length; i++) {
  //   //   //   // Convert each page into an image using html2canvas
  //   //   //   const element = pages[i].element;
  //   //   //   console.log(element);
  //   //   //   // element.querySelector(".wrapped_content").style.zoom = "1";
  //   //   //   const canvas = await html2canvas(element);
  //   //   //   const imgData = canvas.toDataURL("image/png");
  //   //   //   if (i > 0) pdf.addPage();
  //   //   //   pdf.addImage(imgData, "PNG", 0, 0, 794, 1122);
  //   //   //   console.log(`Added page ${i + 1}`);
  //   //   // }
  //   //   // // Automatically download the PDF
  //   //   // //   pdf.save("document.pdf");
  //   //   // const pdfBlob = pdf.output("blob");
  //   //   // const pdfURL = URL.createObjectURL(pdfBlob);
  //   //   // window.open(pdfURL, "_blank");
  //   //   // console.log("PDF downloaded!");
  //   // } catch (error) {
  //   //   console.error("Error during pagination:", error);
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  // };

  // useEffect(() => {
  //   handlePrint();
  // }, []);

  const Template = useTemplate(resumeData);

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
        className={"mx-auto mt-4 max-w-4xl bg-white shadow-2xl"}
      >
        <div
          id="resumePreviewContent"
          style={{
            zoom: (1 / 794) * width,
          }}
        >
          {/* <ATSTemplate1 resumeData={resumeData} /> */}
          <Template resumeData={resumeData} />
        </div>
      </div>
      <div ref={outputRef as React.RefObject<HTMLDivElement>}></div>
    </>
  );
};

export default ResumePreview;
