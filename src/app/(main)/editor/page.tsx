import React from "react";
import { Separator } from "@/components/ui/separator";
import Preview from "@/features/editor/components/Preview";
import Editor from "@/features/editor/components/Editor";
import { ResumeData } from "@/features/editor/providers/ResumeData";
import PreviewRenderer from "@/features/editor/components/PreviewRenderer";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import joyrideSteps from "@/features/editor/constants/joyride_steps";
import Joyride from "react-joyride";
import { TemplateSwitchProvider } from "@/features/editor/providers/TemplateSwitchContext";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return redirect("/sign-in");
    }
    const { id } = await searchParams;
    const existingResume = id
      ? await prisma.resume.findUnique({
          where: { id, userId },
        })
      : null;
    return (
      <ResumeData existingResume={existingResume}>
        <TemplateSwitchProvider>
          <main className="flex min-h-screen w-full lg:max-h-screen">
            {/* <Joyride key={"joyride"} steps={joyrideSteps} /> */}
            <PreviewRenderer />
            <div className="relative mx-auto flex w-full max-w-[1800px] grow bg-card">
              <div className="flex w-full lg:absolute lg:bottom-0 lg:top-0">
                <div className="relative flex min-w-0 flex-1 flex-col bg-card">
                  <Editor />
                </div>
                <Separator
                  orientation="vertical"
                  className="ms-1 hidden lg:block"
                />
                <div className="hidden flex-1 lg:block">
                  <Preview />
                </div>
                <Separator
                  orientation="vertical"
                  className="ms-1 hidden lg:block"
                />
              </div>
            </div>
          </main>
        </TemplateSwitchProvider>
      </ResumeData>
    );
  } catch (error) {
    console.log(error);
    return redirect("/sign-in");
  }
};

export default page;
