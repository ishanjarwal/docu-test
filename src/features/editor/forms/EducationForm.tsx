"use client";
import React, { useEffect } from "react";
import { EditorFormProps } from "../constants/types";
import {
  FieldArrayWithId,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import {
  EducationDetailsSchema,
  EducationDetailsType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "../components/CustomFormField";
import { IoMdAdd } from "react-icons/io";
import { MdDragIndicator, MdOutlineDeleteOutline } from "react-icons/md";

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
    <div className="flex flex-col items-stretch rounded-xl border border-input md:flex-row">
      <div className="flex items-center px-4 pt-4">
        <MdDragIndicator className="rotate-90 cursor-grab text-xl" />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-y-4 p-4">
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
                  disabled: form.watch("educationDetails")?.[index].current
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

export default EducationForm;
