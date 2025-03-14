import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BLOB_READ_WRITE_TOKEN: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    EMAIL_HOST: z.string().min(1),
    EMAIL_PORT: z.string().min(1),
    EMAIL_USER: z.string().min(1),
    EMAIL_PASS: z.string().min(1),
    EMAIL_FROM: z.string().email(),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    CLERK_SIGNING_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_MONTHLY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_ANNUAL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_ANNUAL:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_ANNUAL,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL,
  },
});
