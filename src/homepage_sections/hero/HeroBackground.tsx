"use client";
import { images } from "@/constants/images";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const HeroBackground = () => {
  const { theme, systemTheme } = useTheme();

  if (!theme) {
    return null;
  }

  return (
    <>
      {theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
        <Image
          src={images.hero_dark}
          fill
          alt="Hero Background"
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <Image
          src={images.hero_light}
          fill
          alt="Hero Background"
          className="h-full w-full object-cover object-center"
        />
      )}
    </>
  );
};

export default HeroBackground;
