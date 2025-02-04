"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { SubscriptionLevel } from "../../stripe/actions";

interface SubscriptionLevelProviderProps {
  children: ReactNode;
  subscriptionLevel: SubscriptionLevel;
}

const SubscriptionLevelContext = createContext<SubscriptionLevel | undefined>(
  undefined,
);

export const SubscriptionLevelProvider = ({
  children,
  subscriptionLevel,
}: SubscriptionLevelProviderProps) => {
  return (
    <SubscriptionLevelContext.Provider value={subscriptionLevel}>
      {children}
    </SubscriptionLevelContext.Provider>
  );
};

export const useSubscriptionLevel = (): SubscriptionLevel => {
  const context = useContext(SubscriptionLevelContext);
  if (!context) {
    throw new Error(
      "useSubscriptionLevel must be used within a SubscriptionLevelProvider",
    );
  }
  return context;
};
