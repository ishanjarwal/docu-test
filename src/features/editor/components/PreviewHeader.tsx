"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineGridView } from "react-icons/md";
import StylingTrigger from "./StylingTrigger";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useTemplate } from "../providers/TemplateContext";
import usePremiumFeatures from "@/features/premium/hooks/usePremiumFeatures";
import { useSubscriptionLevel } from "@/features/premium/providers/SubscriptionLevelProvider";
import usePremiumModal from "@/features/premium/hooks/usePremiumModal";

const PreviewHeader = () => {
  const searchParams = useSearchParams();
  const isPreviewOpen = searchParams.get("preview") == "true";
  const subscriptionLevel = useSubscriptionLevel();
  const { canUseCustomizations } = usePremiumFeatures(subscriptionLevel);
  const { setOpen } = usePremiumModal();

  const removePreviewParam = () => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete("preview");
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const { toggleOpen } = useTemplate();

  return (
    <nav
      className={cn(
        "z-[2] flex h-16 items-center justify-between border-b border-border bg-background-muted px-4",
        isPreviewOpen && "fixed top-0 w-full",
      )}
    >
      {/* <ThemeBar /> */}
      <Button
        onClick={() => (canUseCustomizations ? toggleOpen() : setOpen(true))}
        variant={"secondary"}
      >
        <MdOutlineGridView />
        <span>Change Template</span>
      </Button>
      <div className="flex items-center justify-end space-x-2">
        <StylingTrigger />
        {isPreviewOpen && (
          <Button
            onClick={removePreviewParam}
            variant={"secondary"}
            size={"icon"}
          >
            <IoMdClose />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default PreviewHeader;
