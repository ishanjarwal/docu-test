"use client";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import Link from "next/link";
import { FaRegCircleCheck } from "react-icons/fa6";

const SuccessComponent = ({ session_id }: { session_id: string }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Confetti className="pointer-events-none absolute left-0 top-0 z-0 size-full" />
      <div className="rounded-lg p-8 text-center shadow-lg">
        <span className="mx-auto mb-4 flex aspect-square w-24 items-center justify-center rounded-full bg-green-400/10">
          <FaRegCircleCheck className="text-6xl text-green-400" />
        </span>
        <h1 className="mb-4 text-4xl font-bold text-primary">
          Payment Successful!
        </h1>
        <h2 className="mb-4 text-xl text-primary">Payment ID : {session_id}</h2>
        <p className="mb-6 text-lg text-muted-foreground">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
        <Button asChild>
          <Link href={"/resumes"}>Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessComponent;
