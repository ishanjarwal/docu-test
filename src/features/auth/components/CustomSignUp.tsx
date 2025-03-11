"use client";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

const CustomSignUp = () => {
  const { theme, systemTheme } = useTheme();
  const appearance = {
    baseTheme:
      theme === "dark" || (theme === "system" && systemTheme === "dark")
        ? dark
        : undefined,
  };

  return <SignUp appearance={appearance} />;
};

export default CustomSignUp;
