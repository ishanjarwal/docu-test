"use client";
import React, { useEffect } from "react";
import CustomFormField from "../components/CustomFormField";
import { useForm } from "react-hook-form";
import {
  personalDetailsSchema,
  personalDetailsType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { EditorFormProps } from "../constants/types";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

const PersonalDetailsForm = ({
  resumeData,
  setResumeData,
}: EditorFormProps) => {
  const form = useForm<personalDetailsType>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      phone: resumeData.phone || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl font-bold">Personal Details</h1>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">
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
            <div className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">
              <CustomFormField
                props={{
                  name: "email",
                  fieldType: "text",
                  label: "Email",
                  icon: null,
                  placeholder: "Your Email",
                }}
                control={form.control}
              />
              <CustomFormField
                props={{
                  name: "phone",
                  fieldType: "phone",
                  label: "Phone",
                  icon: null,
                  placeholder: "Your Phone Number",
                }}
                control={form.control}
              />
            </div>
            <CustomFormField
              props={{
                name: "Bio",
                fieldType: "textarea",
                label: "Short Bio",
                placeholder: "A Brief about you",
              }}
              control={form.control}
            />
            <div className="grid grid-cols-1 gap-x-2 gap-y-8">
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
            <div className="grid grid-cols-1 gap-x-2 gap-y-8">
              <CustomFormField
                props={{
                  name: "linkedin",
                  fieldType: "text",
                  label: "Linkedin Profile Link",
                  icon: <FaLinkedin />,
                  placeholder: "Your Linkedin profile link",
                }}
                control={form.control}
              />
              <CustomFormField
                props={{
                  name: "github",
                  fieldType: "text",
                  label: "Github Profile Link",
                  icon: <FaGithub />,
                  placeholder: "Your Github profile link",
                }}
                control={form.control}
              />
              <CustomFormField
                props={{
                  name: "instagram",
                  fieldType: "text",
                  label: "Instagram Profile Link",
                  icon: <FaInstagram />,
                  placeholder: "Your Instagram profile link",
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
