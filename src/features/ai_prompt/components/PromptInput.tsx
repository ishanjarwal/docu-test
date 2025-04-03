import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { generateResumeFromPrompt } from "../actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const PromptSchema = z.object({
  prompt: z.string().trim().min(20).max(500),
});

type PromptValues = z.infer<typeof PromptSchema>;

const PromptInput = () => {
  const form = useForm<PromptValues>({
    resolver: zodResolver(PromptSchema),
    defaultValues: { prompt: "" },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const isValid = await form.trigger();
      if (!isValid) return;
      const result = await generateResumeFromPrompt(form.watch("prompt"));
      if (result.error) {
        toast.error(result.error);
      }
      window.location.href = "/editor?id=" + result.success;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border/75 bg-background-muted/25 p-4 backdrop-blur-[2px]">
        <span className="absolute top-0 h-20 w-20 rounded-full bg-primary blur-3xl"></span>
        <span className="absolute bottom-0 right-0 h-20 w-20 rounded-full bg-primary blur-3xl"></span>
        <FormField
          control={form.control}
          name="prompt"
          defaultValue={""}
          render={({ field }) => (
            <FormItem className="relative">
              <FormMessage className="shad-error" />
              <textarea
                onChange={field.onChange}
                className="relative h-32 w-full resize-none bg-transparent text-foreground/75 outline-none"
                placeholder={
                  'Try "Create a professional resume for software developer tailored for google"'
                }
              />
            </FormItem>
          )}
        />

        <div className="relative flex items-center justify-between">
          <Button className="rounded-full bg-foreground">
            <IoMdAdd />
            <span>Upload your resume</span>
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-full bg-foreground"
            size={loading ? "default" : "icon"}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <FaArrowUp />
            )}
          </Button>
        </div>
        <BorderBeam
          duration={6}
          size={200}
          className="from-transparent via-primary to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={200}
          className="from-transparent via-sky-400 to-transparent"
        />
      </div>
    </Form>
  );
};

export default PromptInput;
