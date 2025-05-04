"use client";

import { Button } from "@/components/ui/button";
import { features } from "@/constants/plans";
import { env } from "@/env";
import { useUser } from "@clerk/nextjs";
import { formatDate } from "date-fns";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { retrievePriceDetails } from "../actions";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

const ActivePlan = () => {
  interface planValues {
    id: string | undefined;
    priceId: string;
    name: string;
    expiry: Date | undefined;
    startDate: Date | undefined;
  }
  const { isLoaded } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [currPlan, setCurrPlan] = useState<planValues>({
    id: undefined,
    priceId: "",
    name: "Free",
    expiry: undefined,
    startDate: undefined,
  });
  const fetchPlan = async () => {
    try {
      setLoading(true);
      const plan = await retrievePriceDetails();
      if (plan.priceDetails && plan.subscription) {
        setCurrPlan({
          id: plan.subscription.stripeSubscriptionId,
          priceId: plan.subscription.stripePriceId,
          name: plan.priceDetails.name,
          expiry: plan.subscription.stripeCurrentPeriodEnd,
          startDate: plan.subscription.createdAt,
        });
      }
    } catch (_) {
      toast.error("Error fetching plan details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isLoaded) {
      fetchPlan();
    }
  }, [isLoaded]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Your Plan</h2>
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2
            size={"32"}
            color="hsl(var(--primary))"
            className="animate-spin"
          />
        </div>
      ) : (
        <div>
          <p className="text-sm">
            <strong>Current Plan</strong>&nbsp;:&nbsp;{currPlan.name}
          </p>
          <p className="text-sm">
            <strong>Plan bought on</strong>&nbsp;:&nbsp;
            {currPlan.startDate
              ? formatDate(currPlan.startDate, "d MMMM yyyy")
              : "-- / -- / --"}
          </p>
          <p className="text-sm">
            <strong>Plan expiry</strong>&nbsp;:&nbsp;
            {currPlan.expiry
              ? formatDate(currPlan.expiry, "d MMMM yyyy")
              : "-- / -- / --"}
          </p>
          {currPlan.id && (
            <div className="mt-8 w-full">
              <p className="font-bold">Features included in this plan</p>
              {currPlan.priceId ===
                env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_MONTHLY ||
              currPlan.priceId ===
                env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_ANNUAL ? (
                <ul className="mt-2">
                  {features.hobby.map((item, idx) => (
                    <li
                      key={"planFeature-" + idx}
                      className="flex items-center justify-start space-x-2"
                    >
                      <FaCheck color="green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : currPlan.priceId ===
                  env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY ||
                currPlan.priceId ===
                  env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL ? (
                <ul className="mt-2">
                  {features.pro.map((item, idx) => (
                    <li
                      key={"planFeature-" + idx}
                      className="flex items-center justify-start space-x-2"
                    >
                      <FaCheck color="green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
          <div className="mt-8">
            {currPlan.id ? (
              <ManageSubscriptionButton />
            ) : (
              <Button asChild>
                <Link href={"/plans"}>Buy Subscription</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivePlan;
