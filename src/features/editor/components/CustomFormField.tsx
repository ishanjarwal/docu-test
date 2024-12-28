"use client";
import { PhoneInput } from "@/components/custom/phone-input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import React, { ReactNode, useState } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { Country } from "country-state-city";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";

type FieldType =
  | "text"
  | "checkbox"
  | "select"
  | "password"
  | "radio"
  | "textarea"
  | "phone"
  | "date"
  | "country";

interface CustomFormFieldType {
  form?: UseFormReturn;
  name: string;
  fieldType: FieldType;
  label: string;
  icon?: ReactNode;
  placeholder?: string;
  options?: { label: string; value: string }[];
  disabled?: boolean;
}
const RenderInput = ({
  field,
  props,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  props: CustomFormFieldType;
}) => {
  switch (props.fieldType) {
    case "text":
      return (
        <div className="flex items-center rounded-lg border border-border bg-foreground/5 py-1 ring-ring focus-within:ring-1">
          {props.icon && (
            <span className="ms-3 dark:text-white">{props.icon}</span>
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="mt-0 rounded-none border-0 shadow-none focus-visible:ring-0"
              disabled={props.disabled}
            />
          </FormControl>
        </div>
      );

    case "radio":
      return (
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-wrap gap-2"
          >
            {props?.options &&
              props.options.map((option, idx) => (
                <FormItem
                  key={"radio-form-item-" + idx}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormLabel className="flex cursor-pointer items-center justify-center gap-x-2 whitespace-nowrap rounded-md bg-card-foreground/10 px-3 py-3 duration-100 hover:bg-card-foreground/15 active:scale-90">
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <span>{option.label}</span>
                  </FormLabel>
                </FormItem>
              ))}
          </RadioGroup>
        </FormControl>
      );

    case "textarea":
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            className="min-h-32 resize-none bg-foreground/5"
            {...field}
          />
        </FormControl>
      );

    case "phone":
      return (
        <FormControl>
          <PhoneInput
            className="rounded-lg bg-foreground/5"
            defaultCountry="IN"
            {...field}
          />
        </FormControl>
      );

    case "date":
      return (
        <FormControl>
          <Input
            type="date"
            placeholder={props.placeholder}
            {...field}
            className="block w-full bg-foreground/5 py-[22px]"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case "checkbox":
      return (
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case "country":
      return <CountryInput form={props.form} field={field} />;

    default:
      return null;
  }
};

const CountryInput = ({
  field,
  form,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  form: UseFormReturn | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const countries = Country.getAllCountries();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex w-full justify-between bg-foreground/5 py-[22px] shadow-none"
          >
            {field.value
              ? countries.find((country) => country.name === field.value)?.name
              : "Select country..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.isoCode}
                  value={country.name}
                  onSelect={() => {
                    if (form) {
                      form.setValue("country", country.name);
                    }
                    setOpen(false);
                  }}
                >
                  {country.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      field.value === country.name
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CustomFormField = ({
  control,
  props,
}: {
  control: Control<FieldValues>;
  props: CustomFormFieldType;
}) => {
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem
          className={clsx("flex-1 items-center space-y-1", {
            "flex items-center justify-end gap-x-2 space-y-0":
              props.fieldType === "checkbox",
          })}
        >
          {props.label && (
            <FormLabel
              className={clsx("shad-input-label dark:text-white", {
                "cursor-pointer": props.fieldType === "checkbox",
              })}
            >
              {props.label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
