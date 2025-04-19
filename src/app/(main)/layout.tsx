import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  {
    /* <div>{subscriptionLevel}</div> */
  }
  return <main>{children}</main>;
};

export default layout;
