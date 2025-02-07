import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { useReactToPrint } from "react-to-print";

export const usePrintable = (
  printableRef: React.RefObject<HTMLDivElement | null>,
) => {
  const saver = useReactToPrint({
    contentRef: printableRef,
    print: async (frame: HTMLIFrameElement) => {
      const document = frame.contentDocument;
      if (document) {
        const content = document.getElementById("resumePreviewContent");
        if (!content) return;
        content.style.zoom = "1";
        content.style.width = "100%";

        const canvas = await html2canvas(content, { scale: 2 });
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const margin = 10; // Margin in mm
        const contentWidth = pageWidth - margin * 2;
        const contentHeight = pageHeight - margin * 2;

        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Calculate the number of pages needed
        const totalPages = Math.ceil(imgHeight / contentHeight);

        for (let page = 0; page < totalPages; page++) {
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = (contentHeight * canvas.width) / contentWidth;

          const context = pageCanvas.getContext("2d");
          if (context) {
            // Draw the portion of the content for the current page
            context.fillStyle = "#f0f0f0"; // Background color
            context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            context.drawImage(
              canvas,
              0,
              -(page * pageCanvas.height),
              canvas.width,
              canvas.height,
            );

            const pageImage = pageCanvas.toDataURL("image/png");
            if (page > 0) pdf.addPage();

            // Add margin and draw the content
            pdf.setFillColor(240, 240, 240); // Background color in RGB
            pdf.rect(0, 0, pageWidth, pageHeight, "F"); // Draw background
            pdf.addImage(
              pageImage,
              "PNG",
              margin,
              margin,
              imgWidth,
              contentHeight,
            );
          }
        }

        // Generate the PDF and open in a new tab
        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      }
    },
  });

  return saver;
};
