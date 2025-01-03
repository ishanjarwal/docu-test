"use client";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import ThemeToggleButton from "@/features/theme_toggle/components/ThemeToggleButton";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { FaCrown } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
const Navbar = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <div className="flex h-16 items-center bg-foreground/5">
      <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div>
          <div className="flex items-center">
            <div className="relative aspect-square w-6 lg:w-12">
              <Image
                src={images.logo}
                alt="ResumeBuildr - Your AI Resume Builder"
                fill
              />
            </div>
            <div>
              <h1 className="text-base font-bold md:text-xl lg:text-2xl">
                <span>Resume</span>
                <span className="text-primary">Buildr</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-4">
          <ThemeToggleButton />
          <Button className="h-6 rounded-full border border-white px-2 text-xs font-bold text-white shadow-md hover:scale-105 hover:shadow-xl md:h-9 md:border-2 md:px-4">
            <FaCrown className="text-yellow-200" />
            <span>
              <span>Upgrade</span>
              <span className="hidden md:inline">&nbsp;Now</span>
            </span>
          </Button>
          <UserButton
            appearance={{
              baseTheme:
                theme === "dark" ||
                (systemTheme === "dark" && theme === "system")
                  ? dark
                  : undefined,
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label={"Upgrade now"}
                labelIcon={<FaCrown className="text-yellow-200" />}
                href="/pricing"
              />
              <UserButton.Link
                label={"My Resumes"}
                labelIcon={<HiOutlineDocumentText />}
                href="/resumes"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
