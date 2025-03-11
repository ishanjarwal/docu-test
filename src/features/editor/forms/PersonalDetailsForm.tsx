"use client";
import React, { useEffect, useState } from "react";
import CustomFormField from "../components/CustomFormField";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  personalDetailsSchema,
  personalDetailsType,
  resumeSchemaType,
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
import { useDropzone } from "react-dropzone";
import usePhotoURL from "@/hooks/usePhotoURL";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useDeviceType } from "@/hooks/useDeviceType";
import AIButton from "@/components/custom/AIButton";
import { generateSummary } from "./action";
import toast from "react-hot-toast";
import usePremiumFeatures from "@/features/premium/hooks/usePremiumFeatures";
import { SubscriptionLevel } from "@/features/premium/actions";
import { FaCrown } from "react-icons/fa6";
import Link from "next/link";
import { useSubscriptionLevel } from "@/features/premium/providers/SubscriptionLevelProvider";

const PersonalDetailsForm = ({
  resumeData,
  setResumeData,
}: EditorFormProps) => {
  const subscriptionLevel = useSubscriptionLevel();

  const form = useForm<personalDetailsType>({
    mode: "onChange",
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: { ...resumeData.personalDetails, profilePicture: undefined },
  });

  const { isDesktop } = useDeviceType();
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        personalDetails: {
          ...values,
        },
      });
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

  const photoURL = usePhotoURL(resumeData.personalDetails.profilePicture);

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
                                  !photoURL && "opacity-100",
                                  photoURL && "bg-background/25",
                                )}
                              >
                                <p className="flex flex-col items-center justify-center space-y-1 px-2 text-xs">
                                  <CiImageOn className="size-8" />
                                  <span className="text-center">
                                    {photoURL
                                      ? "Change photo"
                                      : "Drag and drop or select a photo"}
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                          {photoURL && (
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
                  fieldType: "text",
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
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <p>Professional summary</p>
                <AISummaryGenerator
                  subscriptionLevel={subscriptionLevel}
                  resumeData={resumeData}
                  form={form}
                />
              </div>
              <CustomFormField
                props={{
                  name: "summary",
                  fieldType: "textarea",
                  // label: "Professional Summary",
                  placeholder: "A brief about you",
                }}
                control={form.control}
              />
            </div>
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
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;

export const AISummaryGenerator = ({
  resumeData,
  form,
  subscriptionLevel,
}: {
  form: UseFormReturn<personalDetailsType>;
  resumeData: resumeSchemaType;
  subscriptionLevel: SubscriptionLevel;
}) => {
  const [loading, setLoading] = useState(false);
  const { canUseAI } = usePremiumFeatures(subscriptionLevel);
  async function handleClick() {
    try {
      setLoading(true);
      const result = await generateSummary({
        jobTitle: resumeData.personalDetails.jobTitle,
        educationDetails: resumeData.educationDetails,
        workExperiences: resumeData.workExperiences,
      });
      if (result?.error) {
        const tID = toast.error(
          <div className="flex items-center justify-between space-x-1 ps-1">
            <p className="text-sm">{result.error}</p>
            <Button
              className="text-xs"
              size={"sm"}
              variant={"secondary"}
              onClick={() => toast.dismiss(tID)}
            >
              Cancel
            </Button>
          </div>,
          { position: "bottom-center" },
        );
      } else if (result?.success) {
        form.setValue("summary", result.success.content);
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "bottom-center" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return canUseAI ? (
    <AIButton onClick={() => handleClick()} loading={loading} />
  ) : (
    <div className="relative">
      <AIButton />
      <Link
        href={"/plans"}
        className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-foreground/50 text-white opacity-0 backdrop-blur-sm duration-100 hover:opacity-100"
      >
        <p className="flex items-center justify-center space-x-1 text-center">
          <span className="text-xs leading-none">Unlock AI</span>
          <span className="text-yellow-400">
            <FaCrown />
          </span>
        </p>
      </Link>
    </div>
  );
};
