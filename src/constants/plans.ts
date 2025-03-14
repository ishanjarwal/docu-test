import { env } from "@/env";

export const monthlyTiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    priceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_MONTHLY,
    href: "#",
    price: 10,
    description:
      "The perfect plan if you're just getting started with our product.",
    features: ["Upto 5 Resumes", "Limited templates", "Limited AI Features"],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    priceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    href: "#",
    price: 19,
    description: "Dedicated features and templates for professionals.",
    features: [
      "Upto 15 Resumes",
      "Access to all templates",
      "Access to all AI Features",
      "No Watermark on Downloads",
    ],
    featured: true,
  },
];

export const annualTiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    priceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_ANNUAL,
    href: "#",
    strikedPrice: 10,
    price: 6,
    description:
      "The perfect plan if you're just getting started with our product.",
    features: ["Upto 5 Resumes", "Limited templates", "Limited AI Features"],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    priceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL,
    href: "#",
    strikedPrice: 19,
    price: 10,
    description: "Dedicated features and templates for professionals.",
    features: [
      "Upto 15 Resumes",
      "Access to all templates",
      "Access to all AI Features",
      "No Watermark on Downloads",
    ],
    featured: true,
  },
];
