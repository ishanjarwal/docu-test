"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteResume(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return redirect("/sign-in");
    }
    const existingResume = await prisma.resume.findUnique({
      where: { userId, id },
    });
    if (!existingResume) {
      return { error: "No such resume exist" };
    }
    // delete the profile picture
    if (existingResume.personalDetails.profilePicture) {
      await del(existingResume.personalDetails.profilePicture);
    }
    await prisma.resume.delete({ where: { userId, id } });
    revalidatePath("/resumes");
    return { success: "Resume deleted" };
  } catch (error) {
    console.log(error);
    return { error: "unexpected error occurred" };
  }
}
