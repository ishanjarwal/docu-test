import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";
import CreateNewButton from "@/features/dashboard/components/CreateNewButton";
import ResumeList from "@/features/dashboard/components/ResumeList";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const [resumes, count] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: [{ updatedAt: "desc" }],
    }),
    prisma.resume.count({ where: { userId } }),
  ]);

  return (
    <div>
      <div>
        <div className="flex flex-col gap-y-2">
          <AnimateUpOnAppear>
            <h1 className="text-3xl font-semibold">
              My Resumes&nbsp;&#40;{count}&#41;
            </h1>
          </AnimateUpOnAppear>
          <AnimateUpOnAppear delay={0.1}>
            <p className="text-muted-foreground">
              Edit, customize or download your resumes here.
            </p>
          </AnimateUpOnAppear>
          {count > 0 && (
            <AnimateUpOnAppear delay={0.2}>
              <CreateNewButton count={count} />
            </AnimateUpOnAppear>
          )}
        </div>
        <div className="mt-8">
          <ResumeList resumes={resumes} />
        </div>
      </div>
    </div>
  );
};

export default page;
