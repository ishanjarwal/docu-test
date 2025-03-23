"use server";

import { env } from "@/env";
import prisma from "@/lib/prisma";
import { cache } from "react";

export type SubscriptionLevel = "free" | "hobby" | "pro";
export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    try {
      const subscription = await prisma.subscriptions.findUnique({
        where: { userId },
      });
      if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
        return "free";
      }
      if (
        subscription.stripePriceId ===
          env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_MONTHLY ||
        subscription.stripePriceId ===
          env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_ANNUAL
      ) {
        return "hobby";
      }
      if (
        subscription.stripePriceId ===
          env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY ||
        subscription.stripePriceId ===
          env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL
      ) {
        return "pro";
      }
      return "free";
    } catch (error) {
      console.log(error);
      return "free";
    }
  },
);

export const resumeLimitExceeded = async (userId: string): Promise<boolean> => {
  try {
    const subscriptionLevel = await getUserSubscriptionLevel(userId);
    const count = await prisma.resume.count({ where: { userId } });
    switch (subscriptionLevel) {
      case "free":
        return count >= 1;
      case "hobby":
        return count >= 3;
      case "pro":
        return count >= 10;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const canUseCustomizations = async (
  userId: string,
): Promise<boolean> => {
  try {
    const subscriptionLevel = await getUserSubscriptionLevel(userId);
    switch (subscriptionLevel) {
      case "free":
        return false;
      case "hobby":
        return true;
      case "pro":
        return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const canUseAI = async (userId: string): Promise<boolean> => {
  try {
    const subscriptionLevel = await getUserSubscriptionLevel(userId);
    switch (subscriptionLevel) {
      case "free":
        return false;
      case "hobby":
        return false;
      case "pro":
        return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeWatermark = async (userId: string): Promise<boolean> => {
  try {
    const subscriptionLevel = await getUserSubscriptionLevel(userId);
    switch (subscriptionLevel) {
      case "free":
        return false;
      case "hobby":
        return true;
      case "pro":
        return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
