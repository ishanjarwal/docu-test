import { Button } from "@/components/ui/button";
import Navbar from "@/features/dashboard/components/Navbar";
import ResumeList from "@/features/dashboard/components/ResumeList";
import Link from "next/link";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

const page = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <div className="min-h-[calc(100vh - 64px)] mx-auto max-w-screen-2xl px-4 py-4 md:px-8 md:py-8 lg:px-16">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-semibold">My Resumes</h1>
          <p className="text-muted-foreground">
            Edit, customize or download your resumes here.
          </p>
          <Button className="w-max px-8 font-semibold text-white" asChild>
            <Link href={"/editor"}>
              Create New
              <IoAddOutline />
            </Link>
          </Button>
        </div>
        <div className="mt-8">
          <ResumeList />
        </div>
      </div>
    </main>
  );
};

export default page;
