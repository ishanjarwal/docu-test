import { fetchResumes } from "@/app/(main)/resumes/action";
import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Preview from "@/features/editor/components/Preview";
import { templates } from "@/features/editor/constants/templates";
import ATSTemplate1 from "@/features/templates/ats/ats_template_1/ATSTemplate1";
import useDebounce from "@/hooks/useDebounce";
import { mapToResumeSchemaType } from "@/lib/utils";
import { resumeSchemaType } from "@/validations/validation";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";

const SearchInput = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 250);
  const [show, setShow] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Prisma.ResumeGetPayload<{}>[] | null
  >(null);

  const fetchResults = async (query: string) => {
    try {
      setLoading(true);
      const result = await fetchResumes(query);
      setSearchResults(result);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedQuery.trim() != "") {
      fetchResults(debouncedQuery);
    } else {
      setSearchResults(null);
    }
    console.log("fetch called");
  }, [debouncedQuery]);

  return (
    <div className="relative z-[1] w-full sm:w-auto">
      <div className="flex w-full items-center justify-between overflow-hidden rounded-lg border border-border bg-foreground/5 px-2 focus-within:ring-[1px] focus-within:ring-primary sm:min-w-[320px]">
        <FaMagnifyingGlass />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setShow(true);
          }}
          onBlur={() => {
            setShow(false);
          }}
          placeholder="Search your documents"
          className="h-auto w-full rounded-none border-none bg-transparent px-2 py-2 text-xs outline-none focus-visible:ring-0 md:px-4 lg:text-sm"
        />
        {query.trim() && (
          <span
            className="cursor-pointer"
            onClick={() => {
              setQuery("");
              setSearchResults(null);
            }}
          >
            <IoMdClose />
          </span>
        )}
      </div>

      <AnimatePresence>
        {show && query && searchResults && (
          <AnimateUpOnAppear duration={0.2} exit={{ y: "100px", opacity: 0 }}>
            <div
              id="searchResultBox"
              className="absolute left-1/2 top-[calc(100%+8px)] flex w-[calc(100vw-32px)] -translate-x-1/2 flex-col space-y-2 rounded-lg border border-border bg-background p-2 shadow-xl sm:w-full"
            >
              {searchResults.length > 0 ? (
                <div className="h-auto max-h-72 overflow-auto scrollbar-thin scrollbar-thumb-foreground/5 scrollbar-thumb-rounded-full">
                  {searchResults.map((listItem, idx) => {
                    const Template =
                      templates.find(
                        (item) => item.id === listItem.template.templateId,
                      )?.template || ATSTemplate1;
                    return (
                      <React.Fragment key={"searchResult-" + idx}>
                        <Link
                          href={`/editor?id=${listItem.id}`}
                          className="flex items-center space-x-4 rounded-lg border border-border p-2 ps-4 duration-75 hover:bg-foreground/5"
                        >
                          <div className="flex items-center justify-center">
                            <span className="text-xl text-primary">
                              <IoOpenOutline />
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <p>{listItem.title}</p>
                            <span className="text-xs text-muted-foreground">
                              {format(listItem.updatedAt, "dd MMM yyyy")}
                            </span>
                          </div>
                        </Link>
                        <Separator className="my-2 last:hidden" />
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : !loading ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-center">No results found</p>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin" />
                </div>
              )}
            </div>
          </AnimateUpOnAppear>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
