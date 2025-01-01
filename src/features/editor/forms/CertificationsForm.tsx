"use client";
import { Form } from "@/components/ui/form";
import {
  CerificationsSchema,
  CertificationType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import {
  Control,
  useFieldArray,
  UseFieldArrayRemove,
  useForm,
} from "react-hook-form";
import { EditorFormProps } from "../constants/types";
import { MdDragIndicator, MdOutlineDeleteOutline } from "react-icons/md";
import CustomFormField from "../components/CustomFormField";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";

const CertificationsForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<CertificationType>({
    resolver: zodResolver(CerificationsSchema),
    defaultValues: {
      certifications: resumeData.certifications || [{}],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "certifications",
    control: form.control,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        certifications:
          values.certifications?.filter((item) => item !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [resumeData, setResumeData, form]);

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl font-bold">Certifications</h1>
      <p className="mt-2">Add your certificates</p>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
            {fields.map((field, index) => (
              <CertificationItem
                key={field.id}
                index={index}
                remove={remove}
                control={form.control}
              />
            ))}
          </div>
          <Button
            className="mt-4 w-full py-6 text-foreground"
            onClick={() => append({})}
          >
            Add More
            <IoMdAdd />
          </Button>
        </Form>
      </div>
    </div>
  );
};

interface CertificationItemProps {
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<CertificationType>;
}

const CertificationItem = ({
  index,
  remove,
  control,
}: CertificationItemProps) => {
  return (
    <div className="relative flex flex-col items-stretch rounded-xl border border-input md:flex-row">
      <div className="absolute right-0 top-0 flex items-center px-4 pt-4 md:relative md:right-auto md:top-auto">
        <MdDragIndicator className="rotate-90 cursor-grab text-xl" />
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold">Work Experience {index + 1}</h2>
        <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4">
          <div className="col-span-2">
            <CustomFormField
              props={{
                name: `certifications.${index}.title`,
                fieldType: "text",
                label: "Certificate title",
                placeholder: "The title of your certifciate",
              }}
              control={control}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CustomFormField
              props={{
                name: `certifications.${index}.organization`,
                fieldType: "text",
                label: "Organization",
                placeholder: "Certificate issuer",
              }}
              control={control}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CustomFormField
              props={{
                name: `certifications.${index}.link`,
                fieldType: "text",
                label: "Link",
                placeholder: "Link to your certificate",
              }}
              control={control}
            />
          </div>
          <div className="col-span-2">
            <CustomFormField
              props={{
                name: `certifications.${index}.description`,
                fieldType: "textarea",
                label: "Description",
                placeholder: "Describe your experience/learnings",
              }}
              control={control}
            />
          </div>
          <Button
            className="col-span-2 ms-auto w-max border-destructive px-3 text-destructive hover:text-destructive"
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

export default CertificationsForm;
