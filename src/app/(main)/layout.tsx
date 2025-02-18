import { getUserSubscriptionLevel } from "@/features/premium/actions";
import { SubscriptionLevelProvider } from "@/features/premium/providers/SubscriptionLevelProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <SubscriptionLevelProvider subscriptionLevel={subscriptionLevel}>
      {/* <div>{subscriptionLevel}</div> */}
      {children}
    </SubscriptionLevelProvider>
  );
};

export default layout;
