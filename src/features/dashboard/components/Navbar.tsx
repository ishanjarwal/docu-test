"use client";
import CustomUserButton from "@/components/custom/CustomUserButton";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import ThemeToggleButton from "@/features/theme_toggle/components/ThemeToggleButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCrown } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs";
const Navbar = () => {
  const { isSignedIn } = useUser();

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
          {!isSignedIn && (
            <Button
              className="h-6 rounded-full border border-white px-2 text-xs font-bold text-white shadow-md hover:scale-105 hover:shadow-xl md:h-9 md:border-2 md:px-4"
              asChild
            >
              <Link href="/plans">
                <FaCrown className="text-yellow-200" />
                <span>
                  <span>Upgrade</span>
                  <span className="hidden md:inline">&nbsp;Now</span>
                </span>
              </Link>
            </Button>
          )}
          <CustomUserButton />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
