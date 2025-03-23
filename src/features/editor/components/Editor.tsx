"use client";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { steps } from "../constants/steps";
import useAutoSaveResume from "../hooks/useAutoSaveResume";
import { ResumeDataContext } from "../providers/ResumeData";
import BreadCrumbs from "./BreadCrumbs";
import EditorFooter from "./EditorFooter";
import EditorHeader from "./EditorHeader";
import TemplateSwitcher from "./TemplateSwitcher";

const Editor = () => {
  const searchParams = useSearchParams();
  const currStep = searchParams.get("step") || steps[0].key;

  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);

    // using window.history.pushState is better approach than using useRouter hook because it first requests the server but it is just a client side task
  };

  const FormComponent = steps.find((el) => el.key === currStep)?.component;

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  useEffect(() => {
    const toastId: string = "saving-toast";
    if (isSaving) {
      toast.loading("Saving . . .", {
        duration: Infinity,
        position: "bottom-center",
        id: toastId,
      });
    } else {
      toast.dismiss(toastId);
    }

    return () => {
      toast.dismiss(toastId);
    };
  }, [isSaving]);

  return (
    <>
      <TemplateSwitcher />
      <EditorHeader />
      <Toaster />
      <div
        className={clsx(
          "grow overflow-y-auto",
          "pb-16 scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50 lg:pb-0",
        )}
      >
        <BreadCrumbs currStep={currStep} setCurrStep={setStep} />
        {FormComponent && (
          <FormComponent
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}
      </div>
      <EditorFooter
        currStep={currStep}
        setCurrStep={setStep}
        resumeId={resumeData?.id}
      />
    </>
  );
};

export default Editor;
