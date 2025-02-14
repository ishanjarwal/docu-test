"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface TemplateSwitchContextProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const TemplateSwitchContext = createContext<
  TemplateSwitchContextProps | undefined
>(undefined);

export const TemplateSwitchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <TemplateSwitchContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </TemplateSwitchContext.Provider>
  );
};

export const useTemplateSwitch = () => {
  const context = useContext(TemplateSwitchContext);
  if (context === undefined) {
    throw new Error(
      "useTemplateSwitch must be used within a TemplateSwitchProvider",
    );
  }
  return context;
};
