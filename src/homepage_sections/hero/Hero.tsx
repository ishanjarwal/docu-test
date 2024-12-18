import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { LuPartyPopper } from "react-icons/lu";

const Hero = () => {
  return (
    <div className="relative flex justify-center">
      <Image
        src={images.hero_light}
        fill
        alt="Hero Background"
        className="h-full w-full object-cover object-center"
      />
      <div className="max-w-limit relative left-0 top-0 w-full">
        <div className="limit:px-0 flex flex-col items-center justify-between px-4 pt-32 lg:flex-row lg:items-start lg:pt-36">
          <div className="lg:flex-1">
            <p className="mb-4 text-center lg:text-start">
              <Badge
                className={
                  "gap-1 rounded-full border-green-500 bg-white px-3 py-1 text-green-500"
                }
                variant={"outline"}
              >
                <span>
                  <LuPartyPopper />
                </span>
                &nbsp;
                <span>First resume is free to try, Hurry Up ! !</span>
              </Badge>
            </p>
            <h1 className="mb-4 text-center text-3xl font-bold md:text-5xl lg:text-start lg:text-6xl">
              Create a
              <span className="text-green-500">
                &nbsp;Professional Resume&nbsp;
              </span>
              in Minutes with
              <span className="text-green-500">&nbsp;AI</span>
            </h1>
            <p className="mb-4 text-center text-lg lg:text-start lg:text-xl">
              Use our AI Resume Builder to craft a standout resume for your
              career goals.
            </p>
            <div className="flex items-center justify-center lg:justify-start">
              <Button className={"text-lg"} size={"lg"}>
                <span>Try it out</span>
                <span>
                  <FaArrowRight />
                </span>
              </Button>
            </div>
          </div>
          <div className="p-8 lg:flex-1">
            <Image
              src={images.hero_image}
              className="h-full w-full object-contain object-center"
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
