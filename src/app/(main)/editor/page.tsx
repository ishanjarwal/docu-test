import { Separator } from "@/components/ui/separator";
import { SidebarProvider as StylingSidebarProvider } from "@/components/ui/sidebar";
import Editor from "@/features/editor/components/Editor";
import Preview from "@/features/editor/components/Preview";
import PreviewModal from "@/features/editor/components/PreviewModal";
import StylingSidebar from "@/features/editor/components/StylingSidebar";
import Tour from "@/features/editor/components/Tour";
import { ResumeData } from "@/features/editor/providers/ResumeData";
import { TemplateProvider } from "@/features/editor/providers/TemplateContext";
import { resumeLimitExceeded } from "@/features/premium/actions";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isFirstVisit } from "./action";
import PreviewHeader from "@/features/editor/components/PreviewHeader";
import { cn } from "@/lib/utils";

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

  interface SidebarStyles extends React.CSSProperties {
    "--sidebar-width"?: string;
    "--sidebar-width-mobile"?: string;
    "--sidebar-width-icon"?: string;
  }

  return (
    <StylingSidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "100rem",
        } as SidebarStyles
      }
    >
      <ResumeData existingResume={existingResume}>
        <TemplateProvider>
          <Tour firstVisit={firstVisit}>
            <main className="flex min-h-screen w-full lg:max-h-screen">
              <PreviewModal />
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
                    <div
                      className={cn(
                        "h-full overflow-y-auto bg-background-muted scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
                      )}
                    >
                      <PreviewHeader />
                      <div className="px-4 pb-4 pt-8">
                        <Preview className="bg-background/90 backdrop-blur-lg" />
                      </div>
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="ms-1 hidden lg:block"
                  />
                </div>
              </div>
              {/* sidebar for styling */}
              <StylingSidebar />
            </main>
          </Tour>
        </TemplateProvider>
      </ResumeData>
    </StylingSidebarProvider>
  );
};

export default page;
