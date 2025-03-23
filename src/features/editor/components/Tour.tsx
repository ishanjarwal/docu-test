"use client";
import { Button } from "@/components/ui/button";
import { MaskStylesObj } from "@reactour/mask";
import { PopoverStylesObj } from "@reactour/popover";
import { StylesObj, TourProvider } from "@reactour/tour";
import { ReactNode } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import steps from "../constants/guide_steps";
const Tour = ({
  children,
  firstVisit,
}: {
  children: ReactNode;
  firstVisit: boolean;
}) => {
  const styles: StylesObj & PopoverStylesObj & MaskStylesObj = {
    popover: (base) => ({
      ...base,
      backgroundColor: "hsl(var(--background))",
      borderRadius: "8px",
      maxWidth: "368px",
      width: "100%",
    }),
    dot: (base, state) => ({
      ...base,
      backgroundColor: state?.current ? `hsl(var(--primary))` : "transparent",
    }),
  };

  return (
    <TourProvider
      defaultOpen={firstVisit}
      afterOpen={() => {
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.delete("preview");
        window.history.pushState(null, "", `?${newSearchParams.toString()}`);
      }}
      steps={steps}
      styles={styles}
      showBadge={false}
      padding={{ mask: 0, popover: [-10, 10] }}
      onClickClose={({ setCurrentStep, setIsOpen }) => {
        setCurrentStep(0);
        setIsOpen(false);
      }}
      onClickMask={({ setCurrentStep, setIsOpen }) => {
        setCurrentStep(0);
        setIsOpen(false);
      }}
      prevButton={({ currentStep, setCurrentStep }) => {
        const first = currentStep === 0;
        return !first ? (
          <Button
            size={"icon"}
            className="text-white"
            onClick={() => {
              if (!first) {
                setCurrentStep((s) => s - 1);
              }
            }}
          >
            <FaArrowLeft />
          </Button>
        ) : (
          <span className="px-4"></span>
        );
      }}
      nextButton={({
        // Button,
        currentStep,
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        const last = currentStep === stepsLength - 1;
        return (
          <Button
            size={last ? "default" : "icon"}
            className="text-white"
            onClick={() => {
              if (!steps) return;
              if (last) {
                setIsOpen(false);
                setCurrentStep(0);
              } else {
                setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
              }
            }}
          >
            {last ? "Start!" : <FaArrowRight />}
          </Button>
        );
      }}
    >
      {children}
    </TourProvider>
  );
};

export default Tour;
