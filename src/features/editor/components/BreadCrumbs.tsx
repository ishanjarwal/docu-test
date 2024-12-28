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

interface BreadCrumbProps {
  currStep: string;
  setCurrStep: (key: string) => void;
}

const BreadCrumbs = ({ currStep, setCurrStep }: BreadCrumbProps) => {
  return (
    <div
      className={clsx(
        "scrollbar-thin scrollbar-h-1",
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
