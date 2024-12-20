"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

const CustomSignIn = () => {
  const { theme, systemTheme } = useTheme();
  const appearance = {
    baseTheme:
      theme === "dark" || (theme === "system" && systemTheme === "dark")
        ? dark
        : undefined,
  };

  return <SignIn appearance={appearance} />;
};

export default CustomSignIn;
