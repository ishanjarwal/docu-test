"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGear } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";
import { createCustomerPortalSession } from "../actions";

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
      if (!redirectUrl) {
        throw new Error("Something went wrong");
      }
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button disabled={loading} onClick={handleClick}>
      {loading ? (
        <LuLoader />
      ) : (
        <>
          <FaGear />
          <span>Manage Subscription</span>
        </>
      )}
    </Button>
  );
}
