"use client";
import { Button } from "@/components/ui/button";
import usePremiumFeatures from "@/features/premium/hooks/usePremiumFeatures";
import usePremiumModal from "@/features/premium/hooks/usePremiumModal";
import { useSubscriptionLevel } from "@/features/premium/providers/SubscriptionLevelProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { MdOutlineFileDownload, MdOutlineGridView } from "react-icons/md";
import { ResumeDataContext } from "../providers/ResumeData";
import { useTemplate } from "../providers/TemplateContext";
import StylingTrigger from "./StylingTrigger";

const PreviewHeader = () => {
  const searchParams = useSearchParams();
  const isPreviewOpen = searchParams.get("preview") == "true";
  const subscriptionLevel = useSubscriptionLevel();
  const { canUseCustomizations } = usePremiumFeatures(subscriptionLevel);
  const { setOpen } = usePremiumModal();
  const { resumeData } = useContext(ResumeDataContext);

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
        <span className="hidden 2xl:block">Change Template</span>
      </Button>
      <div className="flex items-center justify-end space-x-2">
        <Button className="step6" variant={"secondary"} asChild>
          <Link target="_blank" href={`/preview?id=${resumeData.id}`}>
            <MdOutlineFileDownload />
            <span className="hidden 2xl:block">Download PDF</span>
          </Link>
        </Button>
        <StylingTrigger />
      </div>
    </nav>
  );
};

export default PreviewHeader;
