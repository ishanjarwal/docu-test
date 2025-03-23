"use server";

import { env } from "@/env";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Subscriptions } from "@prisma/client";

export const createCheckoutSession = async (priceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }
    const stripeCustomerId = user.privateMetadata.stripeCustomerId as
      | string
      | undefined;

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${env.NEXT_PUBLIC_BASE_URL}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/plans/failed`,
      customer: stripeCustomerId,
      customer_email: stripeCustomerId
        ? undefined
        : user.emailAddresses[0].emailAddress,
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
      custom_text: {
        terms_of_service_acceptance: {
          message: `I have read ResumeBuildr's [Terms of Service](${env.NEXT_PUBLIC_BASE_URL}/terms-of-service) and agree to them.`,
        },
      },
      consent_collection: {
        terms_of_service: "required",
      },
    });

    if (!session.url) {
      return { error: "Something went wrong" };
    }

    return { success: session.url };
  } catch (error) {
    console.log(error);
    return { error: "Unexpected error occurred" };
  }
};

import Stripe from "stripe";

export const retrieveCheckoutSession = async (sessionId: string) => {
  try {
    // Check if the session ID is provided
    if (!sessionId) {
      return { error: "Session ID is required" };
    }

    // Fetch the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if the session is valid and return success
    if (session && session.id === sessionId) {
      return { success: true, session };
    } else {
      return { success: false, error: "Invalid session ID" };
    }
  } catch (error) {
    console.error("Stripe Error:", error);
    return { error: "Unexpected error occurred" };
  }
};

export const retrievePriceDetails = async (): Promise<{
  priceDetails: Stripe.Product | null;
  subscription: Subscriptions | null;
}> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const subscription = await prisma.subscriptions.findUnique({
      where: { userId },
    });
    if (!subscription) {
      return {
        priceDetails: null,
        subscription: null,
      };
    }
    const priceDetails = await stripe.prices.retrieve(
      subscription.stripePriceId,
      {
        expand: ["product"],
      },
    );
    if (!priceDetails) {
      throw new Error("No product found");
    }
    return {
      priceDetails: priceDetails.product as Stripe.Product,
      subscription: subscription,
    };
  } catch (error) {
    console.log(error);
    return { priceDetails: null, subscription: null };
  }
};

export async function createCustomerPortalSession(): Promise<string | null> {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const stripeCustomerId = user.privateMetadata.stripeCustomerId as
      | string
      | undefined;

    if (!stripeCustomerId) {
      throw new Error("Stripe customer ID not found");
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${env.NEXT_PUBLIC_BASE_URL}/resumes`,
    });

    if (!session.url) {
      throw new Error("Failed to create customer portal session");
    }

    return session.url;
  } catch (error) {
    console.log(error);
    return null;
  }
}
