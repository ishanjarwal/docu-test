"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import PreviewModal from "./PreviewModal";

const PreviewRenderer = () => {
  const searchParams = useSearchParams();
  const previewParam = searchParams.get("preview");

  return previewParam === "true" ? <PreviewModal /> : null;
};

export default PreviewRenderer;
