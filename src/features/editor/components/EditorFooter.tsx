"use client";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";

import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { PreviewToggleContext } from "../providers/PreviewToggle";
import { steps } from "../constants/steps";

interface FooterProps {
  currStep: string;
  setCurrStep: (key: string) => void;
}

const EditorFooter = ({ currStep, setCurrStep }: FooterProps) => {
  const { setPreviewOpen } = useContext(PreviewToggleContext);

  const prevStep = steps.find(
    (_, idx) => steps[idx + 1]?.key === currStep,
  )?.key;

  const nextStep = steps.find(
    (_, idx) => steps[idx - 1]?.key === currStep,
  )?.key;

  return (
    <div className="flex w-full items-center justify-between border-t p-4">
      <div className="flex items-center justify-start space-x-2">
        {prevStep && (
          <Button
            onClick={
              prevStep
                ? () => {
                    setCurrStep(prevStep);
                  }
                : undefined
            }
            className="px-2 py-1 text-xs lg:px-4 lg:py-2 lg:text-sm"
            variant={"outline"}
          >
            <IoMdArrowBack />
            <span className="hidden lg:block">Back</span>
          </Button>
        )}
        {nextStep && (
          <Button
            onClick={
              nextStep
                ? () => {
                    setCurrStep(nextStep);
                  }
                : undefined
            }
            className="bg-foreground px-2 py-1 text-xs hover:bg-foreground/90 lg:px-4 lg:py-2 lg:text-sm"
          >
            <span className="hidden lg:block">Next</span>
            <IoMdArrowForward />
          </Button>
        )}
      </div>
      <div className="flex items-center justify-start space-x-2">
        <Button
          className="py-1 text-xs lg:px-4 lg:py-2 lg:text-sm"
          variant={"destructive"}
        >
          Cancel
        </Button>
        <Button
          onClick={() => setPreviewOpen((prev: boolean) => !prev)}
          className="py-1 text-xs lg:hidden lg:px-4 lg:py-2 lg:text-sm"
          variant={"secondary"}
        >
          Preview
        </Button>
        {/* <p>Saving . . .</p> */}
      </div>
    </div>
  );
};

export default EditorFooter;
