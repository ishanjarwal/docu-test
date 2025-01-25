"use server";

import stripe from "@/lib/stripe";
// import { currentUser } from "@clerk/nextjs/server";

export const createCheckoutSession = async (priceId: string) => {
  try {
    // const user = await currentUser();
    // if (!user) {
    //   return { error: "Unauthorized" };
    // }

    const user = {
      id: "abcd",
      emailAddresses: [{ emailAddress: "abcd@gmail.com" }],
    };

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/plans/success?success_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/plans/failed`,
      customer_email: user.emailAddresses[0].emailAddress,
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
      custom_text: {
        terms_of_service_acceptance: {
          message: `I have read ResumeBuildr's [Terms of Service](${process.env.NEXT_PUBLIC_BASE_URL}/terms-of-service) and agree to them.`,
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

export const retrieveCheckoutSession = async () => {
  try {
    // check if the session id is valid
    return { success: "12345678" };
  } catch (error) {
    return { error: "Unexpected error occurred" };
  }
};
