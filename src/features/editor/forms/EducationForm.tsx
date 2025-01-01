"use client";
import React, { useEffect } from "react";
import { EditorFormProps } from "../constants/types";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  EducationDetailsSchema,
  EducationDetailsType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "../components/CustomFormField";
import { IoMdAdd } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { FiTrash } from "react-icons/fi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaChevronDown } from "react-icons/fa6";
import clsx from "clsx";

const EducationForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<EducationDetailsType>({
    resolver: zodResolver(EducationDetailsSchema),
    defaultValues: {
      educationDetails: resumeData.educationDetails || [{}],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        educationDetails:
          values.educationDetails?.filter((edu) => edu !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    name: "educationDetails",
    control: form.control,
  });

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl font-bold">Educational Details</h1>
      <p className="mt-2">Add your educational qualifications</p>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
            {fields.map((field, index) => (
              <EducationItem
                index={index}
                form={form}
                remove={remove}
                key={field.id}
              />
            ))}
            <Button className="py-6 text-foreground" onClick={() => append({})}>
              Add More
              <IoMdAdd />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

interface EducationItemProps {
  form: UseFormReturn<EducationDetailsType>;
  index: number;
  remove: (index: number) => void;
}

const EducationItem = ({ form, index, remove }: EducationItemProps) => {
  return (
    <Accordion
      type="single"
      className="rounded-lg border border-border px-4 py-4 pe-2"
      collapsible
      defaultValue={"item-1"}
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="truncate py-0 outline-none">
          <div className="flex w-full items-center justify-between gap-x-4">
            <div>
              <MdDragIndicator className="rotate-90 cursor-grab text-xl" />
            </div>
            <div className="flex w-full items-center justify-between truncate">
              <p className="truncate text-lg font-semibold">
                {form.watch("educationDetails")?.[index]?.degree || "Untitled"}
              </p>
              <span>
                <FaChevronDown />
              </span>
            </div>
            <div>
              <Button
                className="px-3 text-destructive hover:text-destructive"
                variant={"ghost"}
                onClick={() => remove(index)}
              >
                <FiTrash className="text-2xl" />
              </Button>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="relative flex flex-col items-stretch md:flex-row">
            <div className="flex-1 px-2 py-4 md:px-4">
              <div className="mt-4 grid grid-cols-1 gap-y-4">
                <CustomFormField
                  props={{
                    name: `educationDetails.${index}.degree`,
                    fieldType: "text",
                    label: "Degree",
                    placeholder: "Degree name",
                  }}
                  control={form.control}
                />
                <CustomFormField
                  props={{
                    name: `educationDetails.${index}.institution`,
                    fieldType: "text",
                    label: "Institution",
                    placeholder: "Institution Name",
                  }}
                  control={form.control}
                />
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-4">
                    <CustomFormField
                      props={{
                        name: `educationDetails.${index}.gpa`,
                        fieldType: "text",
                        label: "Grade/GPA",
                        placeholder: "Your Score",
                      }}
                      control={form.control}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-4">
                    <CustomFormField
                      props={{
                        name: `educationDetails.${index}.startDate`,
                        fieldType: "date",
                        label: "Start Date",
                      }}
                      control={form.control}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-4">
                    <CustomFormField
                      props={{
                        name: `educationDetails.${index}.endDate`,
                        fieldType: "date",
                        label: "End Date",
                        disabled: form.watch("educationDetails")?.[index]
                          .current
                          ? true
                          : false,
                      }}
                      control={form.control}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 px-2 py-2">
                  <CustomFormField
                    props={{
                      name: `educationDetails.${index}.current`,
                      fieldType: "checkbox",
                      label: "Currently studying here",
                    }}
                    control={form.control}
                  />
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EducationForm;
