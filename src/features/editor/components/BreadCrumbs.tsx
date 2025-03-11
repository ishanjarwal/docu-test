import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "../constants/steps";
import clsx from "clsx";
import { useDeviceType } from "@/hooks/useDeviceType";

interface BreadCrumbProps {
  currStep: string;
  setCurrStep: (key: string) => void;
}

const BreadCrumbs = ({ currStep, setCurrStep }: BreadCrumbProps) => {
  const { isDesktop } = useDeviceType();

  return (
    <div
      className={clsx(
        "step2",
        { "scrollbar-thin scrollbar-h-1": isDesktop },
        "sticky top-0 z-50 max-w-full overflow-auto bg-card-foreground/5 p-4 backdrop-blur-md",
      )}
    >
      <Breadcrumb>
        <BreadcrumbList className="flex-nowrap whitespace-nowrap">
          {steps.map((step, idx) => (
            <React.Fragment key={step.key + idx}>
              <BreadcrumbItem>
                {step.key === currStep ? (
                  <BreadcrumbPage>{step.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button onClick={() => setCurrStep(step.key)}>
                      {step.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="last:hidden" />
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
