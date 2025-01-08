import React from "react";
import Preview from "./Preview";

const PreviewModal = () => {
  return (
    <div className="fixed left-0 top-0 z-[1000] h-full min-h-screen w-full">
      <Preview className="bg-background/90 backdrop-blur-lg" />
    </div>
  );
};

export default PreviewModal;
