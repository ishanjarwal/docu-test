"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { retrievePriceDetails } from "../actions";
import toast from "react-hot-toast";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

const ActivePlan = () => {
  interface planValues {
    id: string | undefined;
    name: string;
    expiry: Date | undefined;
    startDate: Date | undefined;
  }
  const { user, isLoaded } = useUser();
  const [currPlan, setCurrPlan] = useState<planValues>({
    id: undefined,
    name: "Free",
    expiry: undefined,
    startDate: undefined,
  });
  const fetchPlan = async () => {
    try {
      const plan = await retrievePriceDetails();
      if (plan.priceDetails && plan.subscription) {
        setCurrPlan({
          id: plan.subscription.stripeSubscriptionId,
          name: plan.priceDetails.name,
          expiry: plan.subscription.stripeCurrentPeriodEnd,
          startDate: plan.subscription.createdAt,
        });
      }
    } catch (error) {
      toast.error("Error fetching plan details");
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
      <div>
        <p className="text-sm">
          <strong>Current Plan</strong>&nbsp;:&nbsp;{currPlan.name}
        </p>
        <p className="text-sm">
          <strong>Plan bought on</strong>&nbsp;:&nbsp;
          {currPlan.startDate
            ? formatDate(currPlan.startDate, "dd mm yyyy")
            : "-- / -- / --"}
        </p>
        <p className="text-sm">
          <strong>Plan expiry</strong>&nbsp;:&nbsp;
          {currPlan.expiry
            ? formatDate(currPlan.expiry, "dd mm yyyy")
            : "-- / -- / --"}
        </p>
        <div className="mt-8">
          {currPlan.id ? (
            <ManageSubscriptionButton />
          ) : (
            <Button>Buy Plan</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivePlan;
