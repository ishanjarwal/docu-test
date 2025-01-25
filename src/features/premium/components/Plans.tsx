"use client";
import { Button } from "@/components/ui/button";
import { tiers } from "@/constants/plans";
import { createCheckoutSession } from "@/features/stripe/actions";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Plans = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckout = async (priceId: string) => {
    try {
      setLoading(true);
      const result = await createCheckoutSession(priceId);
      if (result.error) {
        toast.error("Something went wrong");
      } else if (result.success) {
        window.location.href = result.success;
      }
    } catch (error) {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-primary">Pricing</h2>
        <p className="mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-medium text-muted-foreground sm:text-xl">
        Choose an affordable plan that&#39;s packed with the best features for
        you, creating a highlighting resume.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={cn(
              tier.featured
                ? "relative bg-background-muted shadow-2xl"
                : "bg-background sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none"
                  : "sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl",
              "rounded-3xl p-8 ring-1 ring-border sm:p-10",
            )}
          >
            <h3 id={tier.id} className="text-base/7 font-semibold text-primary">
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight">
                {tier.priceMonthly}
              </span>
              <span className="text-base text-muted-foreground">/month</span>
            </p>
            <p className="mt-6 text-base/7">{tier.description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm/6 sm:mt-10">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-primary"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => handleCheckout(tier.priceId!)}
              variant={tier.featured ? "default" : "outline"}
              className={cn(
                "mt-6 w-full duration-150 hover:scale-105",
                tier.featured && "text-white",
              )}
              disabled={loading}
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
