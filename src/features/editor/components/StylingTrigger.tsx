"use client";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";
import { IoColorPaletteOutline } from "react-icons/io5";

const StylingTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <CustomTooltip text="Style the resume">
      <Button
        className="ml-auto w-9 border border-border bg-white text-xs text-black shadow-md sm:w-auto lg:text-sm"
        onClick={toggleSidebar}
      >
        <IoColorPaletteOutline />
        <span className="hidden sm:block">Styling</span>
      </Button>
    </CustomTooltip>
  );
};

export default StylingTrigger;
