"use server";

import {
  canUseCustomizations,
  getUserSubscriptionLevel,
  SubscriptionLevel,
} from "@/features/premium/actions";
import prisma from "@/lib/prisma";
import { resumeSchema, resumeSchemaType } from "@/validations/validation";
import { auth } from "@clerk/nextjs/server";
import { del, head, put } from "@vercel/blob";
import { cloneDeep } from "lodash";
import isEqual from "lodash.isequal";
import path from "path";

export const saveResume = async (values: resumeSchemaType) => {
  const { id } = values;
  console.log("values received at backend : ", values);
  // test
  try {
    const { personalDetails, ...restResumeData } = resumeSchema.parse(values);
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthorized access");
    }

    //   TODO : check resume count for non-premium users
    const resumeLimits: Record<SubscriptionLevel, number> = {
      free: 1,
      hobby: 3,
      pro: 10,
    };
    const subscriptionLevel = await getUserSubscriptionLevel(userId);
    if (!id) {
      // resume limit check
      const count = await prisma.resume.count({ where: { userId } });
      if (count >= resumeLimits[subscriptionLevel]) {
        throw new Error("Maximum resume limit reached for this account");
      }
    }

    const existingResume = id
      ? await prisma.resume.findUnique({ where: { id, userId } })
      : null;

    if (id && !existingResume) {
      throw new Error("resume not found, invalid id");
    }

    // can use customizations check
    const hasCustomizations = existingResume
      ? !isEqual(
          cloneDeep(existingResume?.template),
          cloneDeep(values.template),
        )
      : false;
    if (hasCustomizations) {
      const customizationsPermission = await canUseCustomizations(userId);
      if (!customizationsPermission) {
        throw new Error("Cannot use customizations for this account");
      }
    }

    //  photo undefined means no photo and null means delete existing photo
    const profilePicture = personalDetails.profilePicture;
    let newPhotoURL: string | undefined | null = undefined;
    if (profilePicture instanceof File) {
      // delete old photo if exists
      if (existingResume?.personalDetails.profilePicture) {
        await del(existingResume.personalDetails.profilePicture);
      }

      // upload new photo
      const blob = await put(
        `resume_profile_pictures/${path.extname(profilePicture.name)}`,
        profilePicture,
        {
          access: "public", // currently only this is available
        },
      );

      newPhotoURL = blob.url;
    } else if (profilePicture === null) {
      if (existingResume?.personalDetails.profilePicture) {
        await del(existingResume.personalDetails.profilePicture);
      }
      newPhotoURL = null;
    } else if (typeof profilePicture === "string") {
      try {
        const isValid = await head(profilePicture);
        newPhotoURL = profilePicture;
      } catch (error) {
        newPhotoURL = existingResume?.personalDetails.profilePicture;
      }
    } else if (profilePicture === undefined) {
      if (existingResume?.personalDetails.profilePicture) {
        newPhotoURL = existingResume.personalDetails.profilePicture;
      }
    }
    console.log("newphotourl", newPhotoURL);
    if (id) {
      // update

      return prisma.resume.update({
        where: { id },
        data: {
          userId,
          personalDetails: {
            ...personalDetails,
            profilePicture: newPhotoURL,
          },
          ...restResumeData,
        },
      });
    } else {
      // insert new entry
      return prisma.resume.create({
        data: {
          userId,
          personalDetails: {
            ...personalDetails,
            profilePicture: newPhotoURL,
          },
          ...restResumeData,
        },
      });
    }
  } catch (error) {
    throw new Error(
      (error instanceof Error && error.message) || "Something went wrong",
    );
  }
};

export const isFirstVisit = async (): Promise<boolean> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!existingUser) {
      throw new Error("Not found");
    }
    if (existingUser.firstVisit) {
      await prisma.user.update({
        where: { clerkId: userId },
        data: { firstVisit: false },
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Cannot update user : ", error);
    return true;
  }
};
