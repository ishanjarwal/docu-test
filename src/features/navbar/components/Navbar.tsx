"use client";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";
import CustomUserButton from "@/components/custom/CustomUserButton";
import navlinks from "@/constants/navlinks";
import ThemeToggleButton from "@/features/theme_toggle/components/ThemeToggleButton";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import AnimateDownOnAppear from "@/components/custom/animators/AnimateDownOnAppear";

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
      <div className="w-full max-w-limit">
        <AnimateDownOnAppear>
          <div
            className={clsx(
              { "rounded-t-lg shadow-none": open },
              { "rounded-lg shadow-lg lg:rounded-xl": !open },
              "relative flex w-full max-w-limit items-center justify-between bg-card px-4 py-4 backdrop-blur-sm md:px-6",
            )}
          >
            {/* mobile menu */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ scaleY: 0, transformOrigin: "top", opacity: 0 }}
                  animate={{ scaleY: "100%", opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ type: "Inertia" }}
                  className="absolute left-0 top-full w-full rounded-b-lg bg-card p-8 shadow-lg"
                >
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
                      {/* <Button className={"text-xs"} variant={"outline"}>
                  <SignInButton />
                </Button> */}
                      <Button
                        className={
                          "bg-foreground text-xs hover:bg-foreground/90"
                        }
                        asChild
                      >
                        <Link href={"/sign-up"}>
                          <span>Try it out</span>
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </SignedOut>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center space-x-2">
              <div className="relative aspect-square w-6 lg:w-8">
                <Image
                  src={images.logo}
                  alt="ResumeBuildr - Your AI Resume Builder"
                  fill
                />
              </div>
              <div>
                <h1 className="text-xl font-bold lg:text-2xl">
                  <span>Resume</span>
                  <span className="text-primary">Buildr</span>
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
            <div className="flex items-center justify-end space-x-2 md:space-x-4">
              <div>
                {/* theme toggle  */}
                <ThemeToggleButton />
              </div>
              <SignedIn>
                <div className="flex items-center">
                  <CustomUserButton />
                </div>
              </SignedIn>
              <SignedOut>
                {/* <Button
              className={"hidden text-xs md:flex lg:text-sm"}
              variant={"outline"}
            >
              <SignInButton />
            </Button> */}
                <Button
                  className={
                    "hidden bg-foreground text-xs hover:bg-foreground/90 sm:flex lg:text-sm"
                  }
                  asChild
                >
                  <Link href={"/sign-up"}>
                    <span>Try it out</span>
                    <span>
                      <FaArrowRight />
                    </span>
                  </Link>
                </Button>
              </SignedOut>
              <Button
                onClick={toggleOpen}
                variant={"ghost"}
                className={"block px-2 md:hidden"}
              >
                {open ? <IoCloseOutline /> : <HiOutlineMenuAlt4 />}
              </Button>
            </div>
          </div>
        </AnimateDownOnAppear>
      </div>
    </header>
  );
};

export default Navbar;
