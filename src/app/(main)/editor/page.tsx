import { Separator } from "@/components/ui/separator";
import Editor from "@/features/editor/components/Editor";
import Preview from "@/features/editor/components/Preview";
import PreviewRenderer from "@/features/editor/components/PreviewRenderer";
import Tour from "@/features/editor/components/Tour";
import { ResumeData } from "@/features/editor/providers/ResumeData";
import { TemplateSwitchProvider } from "@/features/editor/providers/TemplateSwitchContext";
import { resumeLimitExceeded } from "@/features/premium/actions";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isFirstVisit } from "./action";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const { id } = await searchParams;
  if (!id) {
    const resumeLimit = await resumeLimitExceeded(userId);
    console.log(resumeLimit);
    if (resumeLimit) {
      return redirect("/resumes");
    }
  }
  const existingResume = id
    ? await prisma.resume.findUnique({
        where: { id, userId },
      })
    : null;
  const firstVisit = await isFirstVisit();
  return (
    <ResumeData existingResume={existingResume}>
      <TemplateSwitchProvider>
        <Tour firstVisit={firstVisit}>
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
        </Tour>
      </TemplateSwitchProvider>
    </ResumeData>
  );
};

export default page;
