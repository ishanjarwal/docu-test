import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";
import { templates } from "@/features/editor/constants/templates";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-2">
        <AnimateUpOnAppear>
          <h1 className="text-3xl font-semibold">Start from a Template</h1>
        </AnimateUpOnAppear>
        <AnimateUpOnAppear delay={0.1}>
          <p className="text-muted-foreground">
            Begin editing the templates according to your needs.
          </p>
        </AnimateUpOnAppear>
      </div>
      <div className="mt-8">
        <div className="mg:gap-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template, index) => (
            <AnimateUpOnAppear delay={0.05 * index} key={"template-" + index}>
              <div className="group cursor-pointer rounded-xl border border-border p-2 duration-75 hover:bg-foreground/10">
                <div className="relative aspect-[210/297] overflow-hidden rounded-lg">
                  <Image
                    src={template.sample_img}
                    fill
                    alt={template.name}
                    className="h-full w-full object-cover object-center duration-150 group-hover:scale-125"
                  />
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-foreground/25 opacity-0 backdrop-blur-sm duration-150 group-hover:opacity-100">
                    <span className="rounded-md bg-primary p-4 text-white">
                      Click to Select
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-center text-xl capitalize">
                  {template.name}
                </p>
              </div>
            </AnimateUpOnAppear>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
