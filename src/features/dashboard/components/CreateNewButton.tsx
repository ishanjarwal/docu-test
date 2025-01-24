"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/features/premium/hooks/usePremiumModal";
import Link from "next/link";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

const CreateNewButton = ({ count }: { count: number }) => {
  const { setOpen } = usePremiumModal();

  if (count >= 3) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="w-max px-8 font-semibold text-white"
      >
        Create New
        <IoAddOutline />
      </Button>
    );
  }

  return (
    <Button className="w-max px-8 font-semibold text-white" asChild>
      <Link href={"/editor"}>
        Create New
        <IoAddOutline />
      </Link>
    </Button>
  );
};

export default CreateNewButton;
