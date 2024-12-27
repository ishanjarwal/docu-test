"use client";
import React from "react";
import CustomFormField from "../components/CustomFormField";
import { useForm } from "react-hook-form";
import {
  personalDetailsDefValues,
  personalDetailsSchema,
  personalDetailsType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const PersonalDetailsForm = () => {
  const form = useForm<personalDetailsType>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: personalDetailsDefValues,
  });

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Personal Details</h1>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-2">
              <CustomFormField
                props={{
                  name: "firstName",
                  fieldType: "text",
                  label: "First Name",
                  icon: null,
                  placeholder: "Your First Name",
                }}
                control={form.control}
              />
              <CustomFormField
                props={{
                  name: "lastName",
                  fieldType: "text",
                  label: "Last Name",
                  icon: null,
                  placeholder: "Your Last Name",
                }}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                props={{
                  name: "gender",
                  fieldType: "radio",
                  label: "Gender",
                  icon: null,
                  placeholder: "Your Gender",
                  options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ],
                }}
                control={form.control}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
