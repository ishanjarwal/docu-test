"use client";
import stripe from "@/lib/stripe";
import { UserButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { formatDate } from "date-fns";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
import { LiaUserLockSolid } from "react-icons/lia";
import { Button } from "../ui/button";
import Link from "next/link";

const CustomUserButton = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <UserButton
      appearance={{
        baseTheme:
          theme === "dark" || (systemTheme === "dark" && theme === "system")
            ? dark
            : undefined,
        elements: {
          avatarBox: "w-8 h-8",
        },
      }}
    >
      <UserButton.UserProfilePage
        label="My plan"
        url={"/my-plan"}
        labelIcon={<LiaUserLockSolid />}
      >
        <MyPlan />
      </UserButton.UserProfilePage>
      <UserButton.MenuItems>
        <UserButton.Link
          label={"Upgrade now"}
          labelIcon={<FaCrown className="text-yellow-200" />}
          href="/plans"
        />
        <UserButton.Link
          label={"My Resumes"}
          labelIcon={<HiOutlineDocumentText />}
          href="/resumes"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default CustomUserButton;

const MyPlan = () => {
  const [currPlan, setCurrPlan] = useState(null);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Your Plan</h2>
      <div>
        <p className="text-sm">
          <strong>Current Plan</strong>&nbsp;:&nbsp;{"Pro Monthly"}
        </p>
        <p className="text-sm">
          <strong>Plan expiry</strong>&nbsp;:&nbsp;
          {formatDate(new Date(), "dd mm yyyy")}
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href={"/plans"}>{"Buy Subscription"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
