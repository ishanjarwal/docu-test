"use client";
import { Form } from "@/components/ui/form";
import { SkillSchema, SkillType } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import {
  Control,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { EditorFormProps } from "../constants/types";
import CustomFormField from "../components/CustomFormField";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { MdDragIndicator, MdOutlineDeleteOutline } from "react-icons/md";

const SkillForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<SkillType>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      hardSkills: resumeData.hardSkills || [{ name: "", level: 0 }],
      softSkills: resumeData.softSkills || [{ name: "", level: 0 }],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        hardSkills: values.hardSkills?.filter((edu) => edu !== undefined) || [],
        softSkills: values.softSkills?.filter((edu) => edu !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const {
    fields: hardSkillsfields,
    append: hardSkillappend,
    remove: hardSkillremove,
  } = useFieldArray({
    name: "hardSkills",
    control: form.control,
  });

  const {
    fields: softSkillsfields,
    append: softSkillappend,
    remove: softSkillremove,
  } = useFieldArray({
    name: "softSkills",
    control: form.control,
  });

  return (
    <div className="p-4 sm:p-8">
      <Form {...form}>
        <div>
          <h1 className="text-xl font-bold">Hard Skills</h1>
          <p className="mt-2">Add your hard skills</p>
          <div className="mt-8">
            <div>
              <div className="flex flex-col gap-y-8">
                {hardSkillsfields.map((field, index) => (
                  <SkillItem
                    key={field.id}
                    index={index}
                    control={form.control}
                    arrayName="hardSkills"
                    remove={hardSkillremove}
                    form={form}
                  />
                ))}
                <Button
                  className="py-6 text-foreground"
                  onClick={() => hardSkillappend({ name: "", level: 0 })}
                >
                  Add More
                  <IoMdAdd />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* soft skills */}
        <div className="mt-16">
          <h1 className="text-xl font-bold">Soft Skills</h1>
          <p className="mt-2">Add your Soft skills</p>
          <div className="mt-8">
            <div>
              <div className="flex flex-col gap-y-8">
                {softSkillsfields.map((field, index) => (
                  <SkillItem
                    key={field.id}
                    index={index}
                    control={form.control}
                    arrayName="softSkills"
                    remove={softSkillremove}
                    form={form}
                  />
                ))}
                <Button
                  className="py-6 text-foreground"
                  onClick={() => softSkillappend({ name: "", level: 0 })}
                >
                  Add More
                  <IoMdAdd />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

interface SkillItemProps {
  form: UseFormReturn<SkillType>;
  index: number;
  control: Control<SkillType>;
  arrayName: string;
  remove: (index: number) => void;
}

const SkillItem = ({
  form,
  index,
  control,
  arrayName,
  remove,
}: SkillItemProps) => {
  return (
    <div className="flex items-center rounded-lg border border-border">
      <div className="flex-1 px-4">
        <MdDragIndicator className="rotate-90 cursor-grab text-xl" />
      </div>
      <div className="flex w-full flex-col p-4">
        <div className="flex w-full items-start justify-center gap-4">
          <div className="flex-1">
            <CustomFormField
              props={{
                fieldType: "text",
                label: "Skill Name",
                name: `${arrayName}.${index}.name`,
                placeholder: "Skill name",
              }}
              control={control}
            />
          </div>
          <div className="flex-1">
            <CustomFormField
              props={{
                fieldType: "range",
                label: "Skill Level",
                name: `${arrayName}.${index}.level`,
                rangeLabels: ["1", "2", "3", "4", "5"],
                rangeMax: 4,
                rangeStep: 1,
                disabled: form.watch(
                  arrayName as "hardSkills" | "softSkills",
                )?.[index]?.levelDisabled,
              }}
              control={control}
            />
            <div className="mt-4">
              <CustomFormField
                props={{
                  fieldType: "checkbox",
                  label: "Disable Level",
                  name: `${arrayName}.${index}.levelDisabled`,
                }}
                control={control}
              />
            </div>
          </div>
        </div>
        <Button
          className="ms-auto mt-8 w-max border-destructive px-3 text-destructive hover:text-destructive"
          variant={"outline"}
          onClick={() => remove(index)}
        >
          <MdOutlineDeleteOutline className="text-xl" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default SkillForm;
