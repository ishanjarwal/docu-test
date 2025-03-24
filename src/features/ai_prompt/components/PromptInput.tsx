import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

const PromptInput = () => {
  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border/75 bg-background-muted/25 p-4 backdrop-blur-[2px]">
      <span className="absolute top-0 h-20 w-20 rounded-full bg-primary blur-3xl"></span>
      <span className="absolute bottom-0 right-0 h-20 w-20 rounded-full bg-primary blur-3xl"></span>
      <textarea
        className="relative h-32 w-full resize-none bg-transparent text-foreground/75 outline-none"
        placeholder={
          'Try "Create a professional resume for software developer tailored for google"'
        }
      />
      <div className="flex items-center justify-between">
        <Button className="rounded-full bg-foreground">
          <IoMdAdd />
          <span>Upload your resume</span>
        </Button>
        <Button className="rounded-full bg-foreground" size={"icon"}>
          <FaArrowUp />
        </Button>
      </div>
      <BorderBeam
        duration={6}
        size={200}
        className="from-transparent via-primary to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={200}
        className="from-transparent via-sky-400 to-transparent"
      />
    </div>
  );
};

export default PromptInput;
