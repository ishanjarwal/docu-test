import React from "react";
import { Separator } from "@/components/ui/separator";
import Preview from "@/features/editor/components/Preview";
import { PreviewToggle } from "@/features/editor/providers/PreviewToggle";
import Editor from "@/features/editor/components/Editor";
import { ResumeData } from "@/features/editor/providers/ResumeData";

const page = () => {
  return (
    <ResumeData>
      <PreviewToggle>
        <main className="flex max-h-screen min-h-screen w-full">
          <div className="relative mx-auto flex w-full max-w-[1600px] grow bg-card">
            <div className="absolute bottom-0 top-0 flex w-full">
              <div className="relative flex min-w-0 flex-1 flex-col bg-card">
                <Editor />
              </div>
              <Separator orientation="vertical" className="ms-1" />
              <Preview />
              <Separator
                orientation="vertical"
                className="ms-1 hidden lg:block"
              />
            </div>
          </div>
        </main>
      </PreviewToggle>
    </ResumeData>
  );
};

export default page;
