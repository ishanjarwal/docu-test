import { cn } from "@/lib/utils";
import React from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { LuLoaderCircle } from "react-icons/lu";

const AIButton = ({
  onClick,
  text = "Let AI write",
  loading = false,
}: {
  onClick?: () => void;
  text?: string;
  loading?: boolean;
}) => {
  return (
    <div
      onClick={() => {
        if (onClick && !loading) onClick();
      }}
      className={cn(
        "relative w-max cursor-pointer rounded-lg bg-gradient-to-br from-blue-500 via-green-400 to-blue-800 p-[2px] shadow-lg duration-150 hover:scale-105",
        loading && "cursor-not-allowed opacity-50 duration-0 hover:scale-100",
      )}
    >
      <div className="flex items-center justify-center rounded-[6px] bg-background px-3 py-1">
        <div className="flex items-center justify-center space-x-1 bg-gradient-to-br from-blue-500 via-green-400 to-blue-800 bg-clip-text text-sm text-transparent">
          {loading && (
            <LuLoaderCircle className="animate-spin text-green-400" />
          )}
          {!loading && <FaWandMagicSparkles className="text-green-400" />}
          <span className="font-semibold">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default AIButton;
