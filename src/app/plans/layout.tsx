import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();
  if (userId) {
    const exists = await prisma.subscriptions.findUnique({
      where: { userId: userId },
    });
    if (exists) {
      return redirect("/resumes");
    }
  }

  return <main>{children}</main>;
};

export default layout;
