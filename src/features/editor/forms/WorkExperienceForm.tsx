"use client";
import React, { useEffect } from "react";
import { EditorFormProps } from "../constants/types";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  WorkExperienceSchema,
  WorkExperienceType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "../components/CustomFormField";
import { IoMdAdd } from "react-icons/io";
import { MdDragIndicator, MdOutlineDeleteOutline } from "react-icons/md";

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<WorkExperienceType>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [{}],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((item) => item !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    name: "workExperiences",
    control: form.control,
  });

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl font-bold">Work Experiences</h1>
      <p className="mt-2">Add your work history</p>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
            {fields.map((field, index) => (
              <WorkExperienceItem
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

interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceType>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem = ({
  form,
  index,
  remove,
}: WorkExperienceItemProps) => {
  return (
    <div className="relative flex flex-col items-stretch rounded-xl border border-input md:flex-row">
      <div className="absolute right-0 top-0 flex items-center px-4 pt-4 md:relative md:right-auto md:top-auto">
        <MdDragIndicator className="rotate-90 cursor-grab text-xl" />
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold">Work Experience {index + 1}</h2>
        <div className="mt-4 grid grid-cols-1 gap-y-4">
          <CustomFormField
            props={{
              name: `workExperiences.${index}.position`,
              fieldType: "text",
              label: "Job Title",
              placeholder: "Your position at this job",
            }}
            control={form.control}
          />
          <CustomFormField
            props={{
              name: `workExperiences.${index}.employer`,
              fieldType: "text",
              label: "Employer",
              placeholder: "Employer Name",
            }}
            control={form.control}
          />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
              <CustomFormField
                props={{
                  name: `workExperiences.${index}.location`,
                  fieldType: "text",
                  label: "Location",
                  placeholder: "Your job location",
                  disabled:
                    form.watch("workExperiences")?.[index]?.jobType ===
                    "on-site"
                      ? false
                      : true,
                }}
                control={form.control}
              />
            </div>
            <div className="col-span-6 md:col-span-4">
              <CustomFormField
                props={{
                  name: `workExperiences.${index}.startDate`,
                  fieldType: "date",
                  label: "Start Date",
                }}
                control={form.control}
              />
            </div>
            <div className="col-span-6 md:col-span-4">
              <CustomFormField
                props={{
                  name: `workExperiences.${index}.endDate`,
                  fieldType: "date",
                  label: "End Date",
                  disabled: form.watch("workExperiences")?.[index].current
                    ? true
                    : false,
                }}
                control={form.control}
              />
            </div>
          </div>
          <div>
            <CustomFormField
              props={{
                name: `workExperiences.${index}.jobType`,
                fieldType: "radio",
                label: "Job Type",
                options: [
                  { label: "On-site", value: "on-site" },
                  { label: "Remote", value: "remote" },
                  { label: "Hybrid", value: "hybrid" },
                ],
              }}
              control={form.control}
            />
          </div>
          <div className="flex items-center justify-end space-x-2 px-2 py-2">
            <CustomFormField
              props={{
                name: `workExperiences.${index}.current`,
                fieldType: "checkbox",
                label: "Currently working here",
              }}
              control={form.control}
            />
          </div>
          <Button
            className="ms-auto w-max border-destructive px-3 text-destructive hover:text-destructive"
            variant={"outline"}
            onClick={() => remove(index)}
          >
            <MdOutlineDeleteOutline className="text-xl" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
