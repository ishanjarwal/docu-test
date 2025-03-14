"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCustomerPortalSession } from "../actions";
import { Button } from "@/components/ui/button";
import { LuLoader } from "react-icons/lu";

export default function ManageSubscriptionButton() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button disabled={loading} onClick={handleClick}>
      {loading ? <LuLoader /> : "Manage subscription"}
    </Button>
  );
}
