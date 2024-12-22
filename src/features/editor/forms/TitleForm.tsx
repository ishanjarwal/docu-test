"use client";
import CustomTooltip from "@/components/custom/CustomTooltip";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

import { GoPencil } from "react-icons/go";

const TitleForm = () => {
  const form = useForm<{ title: string }>({
    resolver: zodResolver(z.string().optional().or(z.literal(""))),
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto">
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomTooltip text="Edit the Title">
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      <GoPencil className="text-base lg:text-xl" />
                      <div className="relative h-8 min-w-24 max-w-32 md:max-w-64 lg:max-w-72 xl:max-w-96">
                        <input
                          {...field}
                          type="text"
                          placeholder="Untitled"
                          className="absolute left-0 top-0 h-full w-full truncate rounded-none bg-transparent px-1 py-1 text-center text-base outline-none duration-150 hover:bg-foreground/10 focus:bg-foreground/10 focus:shadow-[0_2px_0px_0px_hsl(var(--primary))] lg:px-2 lg:text-xl"
                        />
                        <p className="pointer-events-none invisible h-full w-full overflow-clip whitespace-pre px-1 py-1 text-center text-base opacity-0 lg:px-2 lg:text-xl">
                          {form.watch("title")}
                        </p>
                      </div>
                    </div>
                  </CustomTooltip>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
    </div>
  );
};

export default TitleForm;
