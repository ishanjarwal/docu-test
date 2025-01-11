"use client";

import { mapToResumeSchemaType } from "@/lib/utils";
import { resumeDataDefValues } from "@/validations/defaultValues";
import { resumeSchemaType } from "@/validations/validation";
import { Prisma } from "@prisma/client";
import React, { createContext, ReactNode, useState } from "react";

interface ResumeDataContextType {
  resumeData: resumeSchemaType;
  setResumeData: React.Dispatch<React.SetStateAction<resumeSchemaType>>;
}

export const ResumeDataContext = createContext<ResumeDataContextType>({
  resumeData: resumeDataDefValues,
  setResumeData: () => {},
});

export const ResumeData = ({
  children,
  existingResume,
}: {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  existingResume: Prisma.ResumeGetPayload<{}> | null;
}) => {
  const [resumeData, setResumeData] = useState(
    existingResume
      ? mapToResumeSchemaType(existingResume)
      : resumeDataDefValues,
  );

  return (
    <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeDataContext.Provider>
  );
};
