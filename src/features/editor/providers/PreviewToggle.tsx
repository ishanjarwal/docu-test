"use client";

import React, { createContext, ReactNode, useState } from "react";

interface PreviewContextType {
  previewOpen: boolean;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PreviewToggleContext = createContext<PreviewContextType>({
  previewOpen: false,
  setPreviewOpen: () => {},
});

export const PreviewToggle = ({ children }: { children: ReactNode }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <PreviewToggleContext.Provider value={{ previewOpen, setPreviewOpen }}>
      {children}
    </PreviewToggleContext.Provider>
  );
};
