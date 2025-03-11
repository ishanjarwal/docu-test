import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Toaster />
      {children}
    </main>
  );
};

export default layout;
