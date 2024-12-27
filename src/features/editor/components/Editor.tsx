"use client";
import React from "react";
import EditorHeader from "./EditorHeader";
import EditorFooter from "./EditorFooter";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { steps } from "../constants/steps";
import BreadCrumbs from "./BreadCrumbs";

const Editor = () => {
  const searchParams = useSearchParams();
  const currStep = searchParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);

    // using window.history.pushState is better approach than using useRouter hook because it first requests the server but it is just a client side task
  };

  const FormComponent = steps.find((el) => el.key === currStep)?.component;

  return (
    <>
      <EditorHeader />
      <div
        className={clsx(
          "grow overflow-y-auto",
          "scrollbar-thin scrollbar-track-card scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
        )}
      >
        <BreadCrumbs currStep={currStep} setCurrStep={setStep} />
        {FormComponent && <FormComponent />}
      </div>
      <EditorFooter currStep={currStep} setCurrStep={setStep} />
    </>
  );
};

export default Editor;
