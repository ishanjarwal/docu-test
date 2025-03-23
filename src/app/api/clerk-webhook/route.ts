import { env } from "@/env";
import prisma from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Webhook } from "svix";

export const POST = async (req: NextRequest) => {
  try {
    const secret = env.CLERK_SIGNING_SECRET;
    if (!secret) {
      throw new Error("Invalid clerk signing secret : " + secret);
    }
    const wh = new Webhook(secret);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing Svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const evt: WebhookEvent = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    const evtType = evt.type;
    switch (evtType) {
      case "user.created":
      case "user.updated":
        await prisma.user.upsert({
          where: { clerkId: evt.data.id },
          create: {
            clerkId: evt.data.id,
            email: evt.data.email_addresses[0].email_address,
            name: evt.data.first_name + " " + evt.data.last_name,
            username: evt.data.username,
            verified:
              evt.data.email_addresses[0].verification?.status === "verified"
                ? true
                : false,
            firstVisit: true,
          },
          update: {
            email: evt.data.email_addresses[0].email_address,
            name: evt.data.first_name + " " + evt.data.last_name,
            username: evt.data.username,
            verified:
              evt.data.email_addresses[0].verification?.status === "verified"
                ? true
                : false,
          },
        });
        break;

      case "user.deleted":
        await prisma.user.update({
          where: { clerkId: evt.data.id },
          data: {
            deleted: true,
            deletedAt: new Date(),
          },
        });

      default:
        console.log("unhandled clerk webhook event");
        break;
    }

    return new Response("Clerk webhook event recieved", { status: 200 });
  } catch (error) {
    console.log("Clerk webhook error ; ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
