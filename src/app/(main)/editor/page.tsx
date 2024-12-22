import clsx from "clsx";
import React from "react";
import { Separator } from "@/components/ui/separator";
import EditorFooter from "@/features/editor/components/EditorFooter";
import EditorHeader from "@/features/editor/components/EditorHeader";
import Preview from "@/features/editor/components/Preview";
import { PreviewToggle } from "@/features/editor/providers/PreviewToggle";

const page = () => {
  return (
    <PreviewToggle>
      <main className="flex max-h-screen min-h-screen w-full">
        <div className="relative mx-auto flex w-full max-w-[1600px] grow bg-card">
          <div className="absolute bottom-0 top-0 flex w-full">
            <div className="relative flex min-w-0 flex-1 flex-col bg-card">
              <EditorHeader />
              <div
                className={clsx(
                  "grow overflow-y-auto",
                  "scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
                )}
              >
                {Array.from({ length: 100 }).map((_, i) => (
                  <br key={i} />
                ))}
              </div>
              <EditorFooter />
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
  );
};

export default page;
