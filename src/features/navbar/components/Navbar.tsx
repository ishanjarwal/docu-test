"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import Link from "next/link";
import styles from "./navbar.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import navlinks from "@/constants/navlinks";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-center p-2 lg:p-4">
      <div
        className={clsx(
          { "rounded-t-lg shadow-none": open },
          { "rounded-lg shadow-lg lg:rounded-xl": !open },
          "max-w-limit relative flex w-full items-center justify-between bg-white/85 px-4 py-4 backdrop-blur-sm md:px-6",
        )}
      >
        {/* mobile menu */}
        {open && (
          <div className="absolute left-0 top-full w-full rounded-b-lg bg-white/85 p-8 shadow-lg backdrop-blur-sm">
            <nav
              className={clsx(
                styles.mobile_navlinks_container,
                "flex flex-col items-center justify-center space-y-2",
              )}
            >
              {navlinks.map((el, idx) => (
                <Link key={"mobile-navlink-" + idx} href={el.href}>
                  <span>{el.display}</span>
                  <span className="text-xs duration-150">
                    <FaArrowRight />
                  </span>
                </Link>
              ))}
            </nav>
            <SignedOut>
              <div className="mt-8 flex items-center justify-start space-x-2">
                <Button className={"text-xs"} variant={"outline"}>
                  <SignInButton />
                </Button>
                <Button className={"text-xs"}>
                  <span>Try it out</span>
                  <span>
                    <FaArrowRight />
                  </span>
                </Button>
              </div>
            </SignedOut>
          </div>
        )}

        <div className="flex items-center">
          <div className="relative aspect-square w-6 lg:w-12">
            <Image
              src={images.logo}
              alt="ResumeBuildr - Your AI Resume Builder"
              fill
            />
          </div>
          <div>
            <h1 className="text-xl font-bold lg:text-2xl">
              <span>Resume</span>
              <span className="text-green-500">Buildr</span>
            </h1>
          </div>
        </div>
        <div className="hidden flex-1 lg:block">
          <nav
            className={clsx(
              styles.navlinks_container,
              "flex items-center justify-center space-x-4",
            )}
          >
            {navlinks.map((el, idx) => (
              <Link key={"navlink-" + idx} href={el.href}>
                {el.display}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <SignedIn>
            <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          </SignedIn>
          <div className="flex items-center justify-end space-x-2 md:space-x-4">
            <SignedOut>
              <Button
                className={"hidden text-xs md:flex lg:text-sm"}
                variant={"outline"}
              >
                <SignInButton />
              </Button>
              <Button className={"hidden text-xs sm:flex lg:text-sm"}>
                <span>Try it out</span>
                <span>
                  <FaArrowRight />
                </span>
              </Button>
            </SignedOut>
            <Button
              onClick={toggleOpen}
              variant={"ghost"}
              className={"block px-3 md:hidden"}
            >
              {open ? <IoCloseOutline /> : <HiOutlineMenuAlt4 />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
