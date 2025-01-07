"use client";
import React, { useEffect } from "react";
import CustomFormField from "../components/CustomFormField";
import { useForm } from "react-hook-form";
import {
  personalDetailsSchema,
  personalDetailsType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EditorFormProps } from "../constants/types";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import usePhotoURL from "@/hooks/usePhotoURL";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useDeviceType } from "@/hooks/useDeviceType";

const PersonalDetailsForm = ({
  resumeData,
  setResumeData,
}: EditorFormProps) => {
  const form = useForm<personalDetailsType>({
    mode: "onChange",
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      phone: resumeData.phone || "",
    },
  });

  const { isDesktop } = useDeviceType();

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      form.setValue("profilePicture", acceptedFiles[0], {
        shouldValidate: true,
      });
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    }, // Accept only images
  });

  const photo = form.watch("profilePicture");
  const photoURL = usePhotoURL(photo);

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl font-bold">Personal Details</h1>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">
              {/* profile image input */}
              <div className="col-span-1 sm:col-span-2">
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={() => (
                    <FormItem>
                      <FormLabel className="shad-input-label dark:text-white">
                        Upload your profile picture
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-start space-x-4">
                          <div
                            {...getRootProps()}
                            className="group relative aspect-square w-32 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-foreground/25"
                          >
                            <input {...getInputProps()} />
                            <div
                              className={clsx(
                                "pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center bg-background",
                              )}
                            >
                              <p className="flex flex-col items-center justify-center space-y-1 px-2 text-xs">
                                <CiImageOn className="size-8" />
                                <span className="text-center">
                                  Drag and drop or select a photo
                                </span>
                              </p>
                            </div>

                            {photoURL && (
                              <Image
                                alt="profile image"
                                src={photoURL}
                                fill
                                className="h-full w-full object-cover object-center"
                              />
                            )}
                            {isDesktop && (
                              <div
                                className={clsx(
                                  "pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center bg-background opacity-0 backdrop-blur-sm duration-150 group-hover:opacity-100",
                                  !photo && "opacity-100",
                                  photo && "bg-background/25",
                                )}
                              >
                                <p className="flex flex-col items-center justify-center space-y-1 px-2 text-xs">
                                  <CiImageOn className="size-8" />
                                  <span className="text-center">
                                    {photo
                                      ? "Change photo"
                                      : "Drag and drop or select a photo"}
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                          {photo && (
                            <div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
                              <Button
                                variant={"destructive"}
                                onClick={() => {
                                  form.setValue("profilePicture", null);
                                }}
                              >
                                Remove
                              </Button>
                              <Button variant={"secondary"} onClick={open}>
                                Change
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="shad-error" />
                    </FormItem>
                  )}
                />
              </div>
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
                  name: "jobTitle",
                  fieldType: "text",
                  label: "Job title",
                  icon: null,
                  placeholder: "You are applying for . . .",
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
            <div className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">
              <CustomFormField
                props={{
                  form: form,
                  name: "country",
                  fieldType: "country",
                  label: "Country",
                }}
                control={form.control}
              />
              <CustomFormField
                props={{
                  name: "city",
                  fieldType: "text",
                  label: "City",
                  placeholder: "Your City",
                }}
                control={form.control}
              />
            </div>
            <CustomFormField
              props={{
                name: "bio",
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
