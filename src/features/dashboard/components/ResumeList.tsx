"use client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Prisma } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { cn, mapToResumeSchemaType } from "@/lib/utils";
import ATSTemplate1 from "@/features/templates/ats/ats_template_1/ATSTemplate1";
import useDimensions from "@/hooks/useDimensions";

interface ResumeListProps {
  resumes: Prisma.ResumeGetPayload<object>[];
}

const ResumeList = ({ resumes }: ResumeListProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      {resumes.map((item, idx) => (
        <ResumeItem key={idx} resumeData={item} />
      ))}
    </div>
  );
};

const ResumeItem = ({
  resumeData,
}: {
  resumeData: Prisma.ResumeGetPayload<object>;
}) => {
  const { createdAt, updatedAt, title, id } = resumeData;
  const containerRef = React.useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLElement>;
  const { width } = useDimensions(containerRef);
  return (
    <div className="rounded-lg bg-foreground/5 p-2 md:p-4">
      <div className="group relative aspect-[210/297] overflow-hidden rounded-md bg-background">
        <div
          className="h-full"
          ref={containerRef as React.RefObject<HTMLDivElement>}
        >
          <div
            style={{
              height: "100%",
              zoom: (1 / 794) * width,
            }}
          >
            <ATSTemplate1 resumeData={mapToResumeSchemaType(resumeData)} />
          </div>
        </div>
        <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-card/75 opacity-0 backdrop-blur-sm duration-150 group-hover:opacity-100">
          <Link
            href={`/editor?id=${id}`}
            className="flex aspect-square w-16 items-center justify-center rounded-full bg-primary text-xl text-white duration-75 hover:scale-110"
          >
            <BiExpandAlt />
          </Link>
        </div>
      </div>
      <div className="pt-2">
        <h2 className="truncate text-start font-semibold">
          {title || "Untitled"}
        </h2>
        <div className="mb-2">
          <p className="text-xs text-foreground/75">
            {createdAt === updatedAt
              ? formatDistance(Date.now(), createdAt)
              : "updated " + formatDistance(Date.now(), updatedAt)}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-xs">20%</p>
          <div className="relative h-2 rounded-full bg-black/5 dark:bg-white/5">
            <span className="absolute left-0 top-0 h-2 w-[20%] rounded-full bg-primary"></span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/editor?id=${id}`}
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            <MdOutlineEdit />
            Edit
          </Link>
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
