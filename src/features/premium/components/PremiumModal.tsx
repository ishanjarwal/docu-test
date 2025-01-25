"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaArrowRight, FaCrown } from "react-icons/fa6";
import usePremiumModal from "../hooks/usePremiumModal";
import Link from "next/link";

const PremiumModal = () => {
  const { open, setOpen } = usePremiumModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-12">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-start space-x-2 text-3xl">
            <FaCrown className="text-yellow-400" />
            <span>Upgrade to Premium</span>
          </DialogTitle>
          <DialogDescription>
            To access this feature you need to upgrade your plan. See a list of
            plans here
          </DialogDescription>
        </DialogHeader>
        <div>
          <Button onClick={() => setOpen(false)} className="w-full" asChild>
            <Link href={"/plans"}>
              View Plans
              <FaArrowRight />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
