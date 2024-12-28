"use client";

import { resumeShemaType } from "@/validations/validation";
import React, { createContext, ReactNode, useState } from "react";

interface ResumeDataContextType {
  resumeData: resumeShemaType;
  setResumeData: React.Dispatch<React.SetStateAction<resumeShemaType>>;
}

export const ResumeDataContext = createContext<ResumeDataContextType>({
  resumeData: {},
  setResumeData: () => {},
});

export const ResumeData = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState({});

  return (
    <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeDataContext.Provider>
  );
};
