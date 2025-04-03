"use client";
import { templateDefValues } from "@/validations/defaultValues";
import { TemplateSchema, TemplateValues } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ResumeDataContext } from "./ResumeData";

interface TemplateContextProps {
  isOpen: boolean;
  toggleOpen: () => void;
  form: UseFormReturn<TemplateValues>;
}

const TemplateContext = createContext<TemplateContextProps | undefined>(
  undefined,
);

export const TemplateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { resumeData } = useContext(ResumeDataContext);
  const form = useForm<TemplateValues>({
    mode: "onChange",
    resolver: zodResolver(TemplateSchema),
    defaultValues: resumeData.template || templateDefValues,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <TemplateContext.Provider value={{ isOpen, toggleOpen, form }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
};
