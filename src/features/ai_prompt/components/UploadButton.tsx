"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import CustomTooltip from "@/components/custom/CustomTooltip";

const UploadButton = () => {
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <CustomTooltip
      text={file ? file.name : "Click to upload"}
      delayDuration={0}
    >
      <div className="group flex max-w-[200px] cursor-pointer items-center justify-between rounded-full bg-foreground pe-4 text-background duration-150 hover:bg-primary sm:max-w-[250px]">
        <Label className="flex cursor-pointer items-center justify-center truncate px-4 py-2 pe-0">
          <Input
            onChange={(e) => {
              if (e.target.files && e.target.files?.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
            className="hidden"
            type="file"
          />
          {file ? (
            <BiSolidFilePdf
              size={16}
              className="text-primary duration-150 group-hover:text-background"
            />
          ) : (
            <IoMdAdd size={16} />
          )}
          <span className="ms-2 flex-1 overflow-clip truncate whitespace-nowrap text-xs sm:text-sm">
            {file ? file.name : "Upload your Resume"}
          </span>
        </Label>
        {file && (
          <span
            className="ms-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
            }}
          >
            <IoMdClose size={16} />
          </span>
        )}
      </div>
    </CustomTooltip>
  );
};

export default UploadButton;
