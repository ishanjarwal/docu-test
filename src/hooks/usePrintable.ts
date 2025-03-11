// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import React, { useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { Previewer } from "pagedjs";

// export const usePrintable = (
//   printableRef: React.RefObject<HTMLDivElement | null>,
//   outputRef: React.RefObject<HTMLDivElement | null>,
// ) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const saver = useReactToPrint({
//     contentRef: printableRef,
//     print: async (frame: HTMLIFrameElement) => {
//       try {
//         if (!printableRef.current || !outputRef.current) {
//           return;
//         }

//         setLoading(true);
//         const document = frame.contentDocument;
//         if (document) {
//           const content = document.getElementById("resumePreviewContent");
//           if (!content) return;
//           // content.style.width = "794px"; // important for zooming
//           content.style.zoom = "1";
//           // content.style.aspectRatio = "210/297";

//           const previewer = new Previewer();
//           // Run Paged.js in memory (without rendering)
//           const result = await previewer.preview(
//             content.innerHTML,
//             ["/pagedjs.css"],
//             outputRef.current,
//           );
//           console.log("Paged.js finished processing");

//           // Get the paged content
//           const pages = result.pages;
//           if (!pages || pages.length === 0) {
//             console.error("No pages generated!");
//             return;
//           }
//           // Create PDF
//           const pdf = new jsPDF("p", "px", [794, 1122]); // A4 size

//           for (let i = 0; i < pages.length; i++) {
//             // Convert each page into an image using html2canvas
//             const element = pages[i].element;
//             element.style.zoom = "1";
//             const canvas = await html2canvas(element);
//             const imgData = canvas.toDataURL("image/png");

//             if (i > 0) pdf.addPage();
//             pdf.addImage(imgData, "PNG", 0, 0, 794, 1122);

//             console.log(`Added page ${i + 1}`);
//           }

//           // Automatically download the PDF
//           //   pdf.save("document.pdf");
//           const pdfBlob = pdf.output("blob");
//           const pdfURL = URL.createObjectURL(pdfBlob);
//           window.open(pdfURL, "_blank");

//           console.log("PDF downloaded!");
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return { saver, loading };
// };
