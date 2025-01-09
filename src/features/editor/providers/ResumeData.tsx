"use client";

import { resumeDataDefValues } from "@/validations/defaultValues";
import { resumeSchemaType } from "@/validations/validation";
import React, { createContext, ReactNode, useState } from "react";

interface ResumeDataContextType {
  resumeData: resumeSchemaType;
  setResumeData: React.Dispatch<React.SetStateAction<resumeSchemaType>>;
}

export const ResumeDataContext = createContext<ResumeDataContextType>({
  resumeData: resumeDataDefValues,
  setResumeData: () => {},
});

export const ResumeData = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState(resumeDataDefValues);

  return (
    <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeDataContext.Provider>
  );
};
