"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import React, { useState, useTransition } from "react";
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
import { cn, completionPercentage, mapToResumeSchemaType } from "@/lib/utils";
import ATSTemplate1 from "@/features/templates/ats/ats_template_1/ATSTemplate1";
import useDimensions from "@/hooks/useDimensions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { deleteResume } from "@/app/(main)/resumes/action";
import { LuLoaderCircle } from "react-icons/lu";

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
          <p className="text-xs">
            {completionPercentage(mapToResumeSchemaType(resumeData))}% completed
          </p>
          <div className="relative h-2 rounded-full bg-black/5 dark:bg-white/5">
            <span
              className="absolute left-0 top-0 h-2 rounded-full bg-primary"
              style={{
                width:
                  completionPercentage(mapToResumeSchemaType(resumeData)) + "%",
              }}
            ></span>
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
              <DeleteModal id={resumeData.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
export default ResumeList;

const DeleteModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();
  async function handleDelete() {
    startTransition(async () => {
      try {
        const result = await deleteResume(id);
        if (result.error) {
          toast.error(result.error, { position: "bottom-center" });
        } else if (result.success) {
          toast.success(result.success, { position: "bottom-center" });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { position: "bottom-center" });
      } finally {
        setOpen(false);
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          size={"sm"}
          className="w-full justify-start text-white/75"
        >
          <FiTrash />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            This action cannot be undone and will remove all your data
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"secondary"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant={"destructive"}
            onClick={handleDelete}
          >
            {loading && <LuLoaderCircle className="animate-spin" />}
            {loading ? "Deleting" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
