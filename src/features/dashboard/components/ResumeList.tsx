import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import React from "react";
import { FiTrash } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { BiExpandAlt } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VscFilePdf } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";

const ResumeList = () => {
  return (
    <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ResumeItem key={idx} />
      ))}
    </div>
  );
};

const ResumeItem = () => {
  return (
    <div className="rounded-lg bg-foreground/5 p-2 md:p-4">
      <div className="group relative aspect-[210/297] overflow-hidden rounded-md bg-background">
        <Image
          alt="pdf"
          src={images.sample_resume}
          fill
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-card/75 opacity-0 backdrop-blur-sm duration-150 group-hover:opacity-100">
          <span className="flex aspect-square w-16 items-center justify-center rounded-full bg-primary text-xl text-white duration-75 hover:scale-110">
            <BiExpandAlt />
          </span>
        </div>
      </div>
      <div className="pt-2">
        <h2 className="truncate text-start font-semibold">Untitled</h2>
        <div className="mb-2">
          <p className="text-xs text-foreground/75">2 Days ago</p>
        </div>
        <div className="mb-2">
          <p className="text-xs">20%</p>
          <div className="relative h-2 rounded-full bg-black/5 dark:bg-white/5">
            <span className="absolute left-0 top-0 h-2 w-[20%] rounded-full bg-primary"></span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button className="flex-1 border-none" variant={"outline"}>
            <MdOutlineEdit />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="bg-foreground/5 px-2">
                <BsThreeDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <VscFilePdf />
                <span>Download PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="mt-2">
                <IoShareSocialOutline />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="mt-1 bg-red-500/10 text-destructive hover:!bg-red-500/15 hover:!text-destructive">
                <FiTrash />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ResumeList;
