"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { templateDefValues } from "@/validations/defaultValues";
import { TemplateSchema, TemplateValues } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { templates } from "../constants/templates";
import { ResumeDataContext } from "../providers/ResumeData";
import { useTemplateSwitch } from "../providers/TemplateSwitchContext";

const TemplateSwitcher = () => {
  const { isOpen, toggleOpen } = useTemplateSwitch();
  // const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const form = useForm<TemplateValues>({
    mode: "onChange",
    resolver: zodResolver(TemplateSchema),
    defaultValues: resumeData.template || templateDefValues,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        template: { ...values },
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogOverlay className="z-[1001] bg-background/25">
        {/* <DialogTrigger asChild></DialogTrigger> */}
        <DialogContent className="z-[1001] flex h-full max-h-screen w-full max-w-full flex-col gap-0 overflow-hidden p-0 md:max-h-[90vh] md:max-w-3xl lg:max-w-5xl">
          <DialogHeader className="p-8 shadow-xl">
            <DialogTitle>Change Template</DialogTitle>
            <DialogDescription>Click a template to apply it</DialogDescription>
          </DialogHeader>
          <div
            className={cn(
              "h-full overflow-y-auto p-4 md:p-8",
              "scrollbar-track- scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-thumb-rounded-full",
            )}
          >
            <div className="mg:gap-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {templates.map((template, index) => (
                <div
                  onClick={() => {
                    form.setValue("templateId", template.id);
                    form.setValue("accentHex", template.accentHex);
                    form.setValue("textHex", template.textHex);
                    form.setValue("backdropHex", template.backdropHex);
                    form.setValue("borderStyle", template.borderStyle);
                    form.setValue("fontFace", template.fontFace);
                    toggleOpen();
                  }}
                  className={cn(
                    "group cursor-pointer rounded-xl border border-border p-2 duration-75 hover:bg-foreground/10",
                    resumeData.template.templateId === template.id &&
                      "ring ring-primary",
                  )}
                >
                  <div className="relative aspect-[210/297] overflow-hidden rounded-lg">
                    <Image
                      src={template.sample_img}
                      fill
                      alt={template.name}
                      className="h-full w-full object-cover object-center duration-150 group-hover:scale-125"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-foreground/25 opacity-0 backdrop-blur-sm duration-150 group-hover:opacity-100">
                      <span className="rounded-md bg-primary p-4 text-white">
                        Click to choose
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-xl capitalize">
                    {template.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default TemplateSwitcher;
