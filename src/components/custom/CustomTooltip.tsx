import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const CustomTooltip = ({
  className,
  side = "bottom",
  delayDuration = 1000,
  text,
  children,
}: {
  className?: string;
  side?: string;
  delayDuration?: number;
  text: string;
  children: ReactNode;
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={cn(
            "pointer-events-none border-border bg-foreground",
            className,
          )}
          side={side as "bottom" | "top" | "left" | "right"}
        >
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
