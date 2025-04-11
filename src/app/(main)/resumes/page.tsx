import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";
import { Separator } from "@/components/ui/separator";
import CreateNewButton from "@/features/dashboard/components/CreateNewButton";
import ResumeList from "@/features/dashboard/components/ResumeList";
import { templates } from "@/features/editor/constants/templates";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

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

      <Separator className="my-16" />

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
    </div>
  );
};

export default page;
