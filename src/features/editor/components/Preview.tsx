"use client";
import clsx from "clsx";
import React from "react";

const Preview = () => {
  return (
    <div
      className={clsx(
        "h-screen w-full flex-1 overflow-y-auto bg-card",
        "scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
      )}
    >
      {Array.from({ length: 100 }).map((_, i) => (
        <br key={i} />
      ))}
    </div>
  );
};

export default Preview;
