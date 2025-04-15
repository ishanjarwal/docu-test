import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchInput = () => {
  return (
    <div className="flex-grow-0">
      <Popover>
        <PopoverTrigger>
          <div className="flex max-w-[320px] items-center justify-between overflow-hidden rounded-lg border border-border bg-foreground/5 pe-2 focus-within:ring-[1px] focus-within:ring-primary">
            <Input
              type="text"
              placeholder="Search your documents"
              className="h-auto w-full rounded-none border-none bg-transparent px-2 py-2 text-xs outline-none focus-visible:ring-0 md:px-4 lg:text-sm"
            />
            <FaMagnifyingGlass />
          </div>
        </PopoverTrigger>
        <PopoverContent>hello</PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchInput;
