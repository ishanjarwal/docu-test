import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const PaymentFailedPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="rounded p-8 text-center shadow-md">
        <span className="mx-auto mb-4 flex aspect-square w-24 items-center justify-center rounded-full bg-red-400/10">
          <IoIosCloseCircleOutline className="text-6xl text-red-400" />
        </span>
        <h1 className="text-3xl font-bold text-destructive">Payment Failed</h1>
        <p className="mb-6 mt-4 text-muted-foreground">
          Unfortunately, your payment could not be processed. Please try again
          or contact support.
        </p>
        <Button variant={"destructive"} asChild>
          <Link href={"/plans"}>Go to Plans</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
