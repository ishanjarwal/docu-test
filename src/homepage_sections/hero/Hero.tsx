"use client";
import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { LuPartyPopper } from "react-icons/lu";
import "swiper/css";
import "swiper/css/effect-cards";
import HeroBackground from "./HeroBackground";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { useTheme } from "next-themes";
import { env } from "@/env";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

const Hero = () => {
  const { isSignedIn } = useUser();
  const { theme } = useTheme();

  return (
    <div className="relative flex justify-center">
      {/* <HeroBackground /> */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,green,transparent)]",
        )}
      />
      <div className="relative left-0 top-0 w-full max-w-limit">
        <div className="flex flex-col items-center justify-between px-4 pb-16 pt-32 lg:pt-36 limit:px-0">
          <div className="w-full">
            <div className="mb-4 text-center">
              <AnimateUpOnAppear>
                <Badge
                  className={
                    "gap-1 rounded-full border-primary bg-background px-3 py-1 text-primary"
                  }
                  variant={"outline"}
                >
                  <span>
                    <LuPartyPopper />
                  </span>
                  &nbsp;
                  <span>First resume is free to try, Hurry Up ! !</span>
                </Badge>
              </AnimateUpOnAppear>
            </div>
            <AnimateUpOnAppear delay={0.1}>
              <h1 className="mx-auto mb-8 max-w-2xl text-center text-3xl md:text-5xl">
                Create a
                <span className="text-primary">
                  &nbsp;Professional Resume&nbsp;
                </span>
                in Minutes with
                <span className="text-primary">&nbsp;AI</span>
              </h1>
            </AnimateUpOnAppear>
            <AnimateUpOnAppear delay={0.2}>
              <p className="mx-auto mb-8 max-w-xl text-center text-base text-foreground/75 lg:text-lg">
                Use our AI Resume Builder to craft a standout resume for your
                career goals.
              </p>
            </AnimateUpOnAppear>
            <AnimateUpOnAppear delay={0.3}>
              <div className="mx-auto flex items-center justify-center space-x-2">
                <Button
                  asChild
                  className={"bg-foreground hover:bg-foreground/90"}
                >
                  <Link href={isSignedIn ? "/resumes" : "/sign-up"}>
                    <span>{isSignedIn ? "Dashboard" : "Try it out"}</span>
                    <span>
                      <FaArrowRight />
                    </span>
                  </Link>
                </Button>
                <Button asChild variant={"secondary"} className={""}>
                  <Link href={"/#explore"}>
                    <span>Explore</span>
                  </Link>
                </Button>
              </div>
            </AnimateUpOnAppear>
          </div>
          <div className="relative w-full pt-16">
            <AnimateUpOnAppear>
              <div id="explore" className="mx-auto w-full max-w-6xl">
                <HeroVideoDialog
                  animationStyle="from-center"
                  videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                  thumbnailSrc={
                    theme === "dark"
                      ? "/hero-video-thumb-dark.png"
                      : "/hero-video-thumb-light.png"
                  }
                  thumbnailAlt="Hero Video"
                />
              </div>
            </AnimateUpOnAppear>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
