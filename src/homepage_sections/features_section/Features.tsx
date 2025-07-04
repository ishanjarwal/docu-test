import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { BsFiletypePdf } from "react-icons/bs";
import { FaMagic } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import { IoColorPaletteOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";

const Features = () => {
  const features = [
    {
      icon: <FaMagic />,
      title: "AI-Powered Assistance",
      desc: "Get smart suggestions for content, formatting, and wording to craft a professional resume effortlessly.",
    },
    {
      icon: <LuFiles />,
      title: "5+ Professional Templates",
      desc: "Choose from a variety of modern, ATS-friendly resume templates to match your style and industry.",
    },
    {
      icon: <IoColorPaletteOutline />,
      title: "Advanced Customization",
      desc: "Personalize your resume with fonts, accent colors, and background options to make it uniquely yours.",
    },
    {
      icon: <BsFiletypePdf />,
      title: "Export to PDF",
      desc: "Download your resume instantly in a high-quality, ATS-optimized PDF format with just one click.",
    },
    {
      icon: <IoIosTimer />,
      title: "Auto-Save",
      desc: "Never lose progress—your resume is automatically saved in real time, ensuring a seamless experience.",
    },
    {
      icon: <FiUserCheck />,
      title: "User-Friendly Interface",
      desc: "Enjoy a smooth and intuitive experience with a clean UI and support for both dark and light modes.",
    },
  ];

  return (
    <section id="features">
      <div className="mx-auto max-w-7xl py-16">
        <div className="flex items-center justify-center">
          <Badge
            className="rounded-full border-primary bg-transparent px-3 py-1"
            variant={"outline"}
          >
            <span className="me-2 scale-125 text-primary">•</span>
            <span>Features</span>
          </Badge>
        </div>
        <h2 className="mb-8 mt-4 text-balance text-center text-4xl font-bold md:text-6xl md:font-normal">
          The <span className="text-primary">Perfect </span> software suite for
          your <span className="text-primary">Workspace </span>
        </h2>
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <AnimateUpOnAppear key={"feature-" + index} delay={0.1 * index}>
              <div className="overflow-hidden rounded-xl border border-border bg-foreground/5 duration-150 hover:scale-105 hover:bg-foreground/10">
                <div className="p-4">
                  <p className="mt-4 text-primary">
                    {item.icon &&
                      React.cloneElement(item.icon, { className: "size-8" })}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{item.title}</h2>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            </AnimateUpOnAppear>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
