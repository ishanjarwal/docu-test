"use client";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa6";
import { LuAudioLines } from "react-icons/lu";
import { z } from "zod";
import { generateResumeFromPrompt } from "../actions";
import { SpeechRecognitionErrorEvent, SpeechRecognitionEvent } from "../types";
import UploadButton from "./UploadButton";

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

  const [listening, setListening] = useState<boolean>(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript: string = event.results[0][0].transcript;
      const prev = form.watch("prompt");
      form.setValue("prompt", prev + " " + transcript);
      // console.log("Transcript:", transcript); // for testing
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      alert("Recognition Error : " + event.error);
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setListening(false);
    };

    if (listening) {
      recognition.start();

      // Stop after 30 seconds
      setTimeout(() => {
        recognition.stop();
      }, 30000);
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [listening]);

  const toggleListening = () => {
    setListening((prev) => !prev);
  };

  return (
    <Form {...form}>
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-border/75 bg-background/75 p-4 shadow-xl backdrop-blur-[2px]">
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
                value={field.value}
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
          <UploadButton />

          <div className="flex items-center justify-end space-x-2">
            <Button
              onClick={toggleListening}
              className={cn(
                "rounded-full bg-foreground duration-150",
                listening && "bg-primary",
              )}
            >
              <LuAudioLines />
              <span className="hidden md:block">
                {listening ? "Listening" : "Voice"}
              </span>
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
