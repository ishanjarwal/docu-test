export const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY,
    href: "#",
    priceMonthly: "$10",
    description:
      "The perfect plan if you're just getting started with our product.",
    features: ["Upto 5 Resumes", "Limited templates", "Limited AI Features"],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    href: "#",
    priceMonthly: "$19",
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
