import prisma from "@/lib/prisma";
import { mapToResumeSchemaType } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PrintPreview from "./PrintPreview";

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
  const currentResume = id
    ? await prisma.resume.findUnique({
        where: { id, userId },
      })
    : null;
  if (!currentResume) {
    return redirect("/resumes");
  }
  return (
    <main className="bg-background-muted p-4 sm:py-8 md:py-16">
      <PrintPreview resumeData={mapToResumeSchemaType(currentResume)} />
    </main>
  );
};

export default page;
