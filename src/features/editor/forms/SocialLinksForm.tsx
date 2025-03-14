"use client";
import React, { useEffect } from "react";
import CustomFormField from "../components/CustomFormField";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { EditorFormProps } from "../constants/types";
import {
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaXTwitter,
} from "react-icons/fa6";
import { SocialLinksSchema, SocialLinksValues } from "@/validations/validation";
import { Button } from "@/components/ui/button";
import { socialLinksDefValues } from "@/validations/defaultValues";

const SocialLinksForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<SocialLinksValues>({
    mode: "onChange",
    resolver: zodResolver(SocialLinksSchema),
    defaultValues: resumeData.socialLinks || socialLinksDefValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "custom",
    control: form.control,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        socialLinks: {
          ...values,
          custom: values.custom?.filter((item) => item != undefined) || [],
        },
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl font-bold">Social Links</h1>
      <p className="mt-2">Add your social media links</p>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
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
              <CustomFormField
                props={{
                  name: "twitter",
                  fieldType: "text",
                  label: "Twitter Profile Link",
                  icon: <FaXTwitter />,
                  placeholder: "Your Twitter profile link",
                }}
                control={form.control}
              />
              <CustomFormField
                props={{
                  name: "threads",
                  fieldType: "text",
                  label: "Threads Profile Link",
                  icon: <FaThreads />,
                  placeholder: "Your Threads profile link",
                }}
                control={form.control}
              />
              <CustomFormField
                props={{
                  name: "website",
                  fieldType: "text",
                  label: "Your website link",
                  icon: <FaGlobe />,
                  placeholder: "Your website link",
                }}
                control={form.control}
              />
              <div className="flex flex-col gap-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col gap-y-2 rounded-lg border border-border p-2"
                  >
                    <CustomFormField
                      props={{
                        name: `custom.${index}.label`,
                        fieldType: "text",
                        label: "Label",
                        placeholder: "Label",
                      }}
                      control={form.control}
                    />
                    <CustomFormField
                      key={field.id}
                      props={{
                        name: `custom.${index}.link`,
                        fieldType: "text",
                        label: "Link",
                        placeholder: "Link",
                      }}
                      control={form.control}
                    />
                    <Button
                      onClick={() => {
                        remove(index);
                      }}
                      variant={"secondary"}
                      className="bg-red-500/25 hover:bg-red-500/50"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    append({ label: "", link: "" });
                  }}
                  variant={"secondary"}
                >
                  Add another
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SocialLinksForm;
