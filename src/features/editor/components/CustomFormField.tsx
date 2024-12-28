import { PhoneInput } from "@/components/custom/phone-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import React, { ReactNode } from "react";
import { Control, ControllerRenderProps, FieldValues } from "react-hook-form";

type FieldType =
  | "text"
  | "checkbox"
  | "select"
  | "password"
  | "radio"
  | "textarea"
  | "phone";

interface CustomFormFieldType {
  name: string;
  fieldType: FieldType;
  label: string;
  icon?: ReactNode;
  placeholder: string;
  options?: { label: string; value: string }[];
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
        <div className="flex items-center rounded-lg border border-border py-1 ring-ring focus-within:ring-1">
          {props.icon && (
            <span className="ms-3 dark:text-white">{props.icon}</span>
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="mt-0 rounded-none border-0 shadow-none focus-visible:ring-0"
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
            className="min-h-32 resize-none"
            {...field}
          />
        </FormControl>
      );

    case "phone":
      return (
        <FormControl>
          <PhoneInput defaultCountry="IN" {...field} />
        </FormControl>
      );

    default:
      return null;
  }
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
        <FormItem className="flex-1 space-y-1">
          {props.label && props.fieldType != "checkbox" && (
            <FormLabel className="shad-input-label dark:text-white">
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
