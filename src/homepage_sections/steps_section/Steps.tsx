"use client";
import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const steps = [
  {
    title: "Create an account",
    desc: "Sign up for a free account to get started. No credit card required.",
    img: "",
  },
  {
    title: "Fill in your details",
    desc: "Enter your personal information, work experience, and education.",
    img: "",
  },
  {
    title: "Choose a template",
    desc: "Select a professional template that matches your style and industry.",
    img: "",
  },
  {
    title: "Download your resume",
    desc: "Export your resume in a high-quality PDF format with just one click.",
    img: "",
  },
];

const Steps = () => {
  const [active, setActive] = useState<number>(0);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-x-8">
          <div className="flex w-full flex-1 flex-col space-y-4">
            <AnimateUpOnAppear>
              <Badge
                className="w-max rounded-full border-primary bg-transparent px-3 py-1"
                variant={"outline"}
              >
                <span className="me-2 scale-125 text-primary">•</span>
                <span>How to use</span>
              </Badge>
            </AnimateUpOnAppear>
            <AnimateUpOnAppear delay={0.2}>
              <h1 className="text-3xl font-semibold md:text-5xl">
                No magic wand needed
              </h1>
            </AnimateUpOnAppear>
          </div>
          <div className="flex-1">
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              accusamus culpa minima beatae ab amet libero non cum voluptatem.
              Quia ad numquam quam corrupti porro. Sunt eligendi quos quisquam
              minus!
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-center space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0">
          <div className="flex flex-1 flex-col items-center justify-center space-y-2 lg:space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-full cursor-pointer items-start rounded-xl px-4 py-6",
                  active === index && "border border-border bg-foreground/5",
                )}
                onClick={() => setActive(index)}
              >
                <div className="me-4">
                  <span
                    className={cn(
                      "text-xl font-semibold text-foreground/25",
                      active === index && "text-primary",
                    )}
                  >
                    {"0"}
                    {index + 1}
                    {"."}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  {index === active && (
                    <p className="text-muted-foreground">{step.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 self-stretch">
            <div className="h-full overflow-hidden rounded-2xl border border-border bg-foreground">
              <Image
                width={500}
                height={700}
                src="/ats-template-1.png"
                alt="steps"
                className="w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
