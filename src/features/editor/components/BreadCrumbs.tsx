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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";

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
        "sticky top-0 z-[1] max-w-full overflow-auto bg-background-muted px-4 py-2",
      )}
    >
      <Breadcrumb>
        <BreadcrumbList className="flex-nowrap whitespace-nowrap">
          {steps.slice(0, 5).map((step, idx) => (
            <React.Fragment key={step.key + idx}>
              <BreadcrumbItem>
                {step.key === currStep ? (
                  <BreadcrumbPage className="flex h-9 items-center justify-center space-x-2 rounded-full border border-foreground bg-background-muted px-4 text-foreground shadow-xl">
                    <span className="text-sm">{step.icon}</span>
                    <span>{step.title}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Button
                      variant={"outline"}
                      className="rounded-full"
                      onClick={() => setCurrStep(step.key)}
                    >
                      <span className="text-sm">{step.icon}</span>
                      <span>{step.title}</span>
                    </Button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator className="last:hidden" /> */}
            </React.Fragment>
          ))}
          <DropdownMenu>
            <BreadcrumbItem>
              <DropdownMenuTrigger asChild>
                <Button variant={"secondary"} className="rounded-full">
                  More
                  <IoMdAdd />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[280px] !rounded-xl p-2 shadow-lg">
                {steps.slice(5).map((item, index) => (
                  <DropdownMenuItem key={"add-more-" + index} asChild>
                    <div
                      onClick={() => setCurrStep(item.key)}
                      className="flex cursor-pointer items-center justify-start space-x-2 !rounded-lg p-2 hover:!bg-foreground/5"
                    >
                      <span className="flex aspect-square w-12 items-center justify-center rounded-lg border border-border">
                        <span className="text-lg text-primary">
                          {item.icon}
                        </span>
                      </span>
                      <p>{item.title}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </BreadcrumbItem>
          </DropdownMenu>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
