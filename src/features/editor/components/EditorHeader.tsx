"use client";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import ThemeToggleButton from "@/features/theme_toggle/components/ThemeToggleButton";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { TiPencil } from "react-icons/ti";

const EditorHeader = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <header className="flex w-full items-center justify-between border-b p-2">
      <div className="flex basis-3/12 items-center">
        <div className="relative aspect-square w-6 lg:w-12">
          <Image
            src={images.logo}
            alt="ResumeBuildr - Your AI Resume Builder"
            fill
          />
        </div>
        <div>
          {/* <h1 className="text-lg font-bold lg:text-xl">
            <span>Resume</span>
            <span className="text-primary">Buildr</span>
          </h1> */}
        </div>
      </div>
      <div className="basis-3/4">
        {/* for title of the current resume (editable) */}
        <h2 className="flex items-center justify-center space-x-2 lg:text-lg">
          <CustomTooltip text="Edit the Title">
            <Button variant={"ghost"}>
              <TiPencil />
            </Button>
          </CustomTooltip>
          <span>Untitled</span>
        </h2>
      </div>
      <div className="flex basis-3/12 items-center justify-end space-x-4">
        <ThemeToggleButton />
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
        />{" "}
      </div>
    </header>
  );
};

export default EditorHeader;
