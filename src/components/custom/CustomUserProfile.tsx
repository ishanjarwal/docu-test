"use client";
import ActivePlan from "@/features/stripe/components/ActivePlan";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";
import { LiaUserLockSolid } from "react-icons/lia";

const CustomUserProfile = () => {
  const { theme, systemTheme } = useTheme();
  return (
    <main className="flex items-center justify-center py-2 md:py-16">
      <UserProfile
        appearance={{
          baseTheme:
            theme === "dark" || (systemTheme === "dark" && theme === "system")
              ? dark
              : undefined,
        }}
      >
        <UserProfile.Page
          label="My Plan"
          labelIcon={<LiaUserLockSolid />}
          url="active-plan"
        >
          <ActivePlan />
        </UserProfile.Page>
      </UserProfile>
    </main>
  );
};

export default CustomUserProfile;
