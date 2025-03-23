"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { sendEmail } from "./actions";
import { ContactFormSchema, ContactFormValues } from "./validation";
import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (data: ContactFormValues) => {
    console.log(data);
    try {
      setLoading(true);
      const { success, message } = await sendEmail(data);
      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-center">
          <AnimateUpOnAppear>
            <Badge
              className="rounded-full border-primary bg-transparent px-3 py-1"
              variant={"outline"}
            >
              <span className="me-2 scale-125 text-primary">•</span>
              <span>Contact</span>
            </Badge>
          </AnimateUpOnAppear>
        </div>
        <AnimateUpOnAppear delay={0.1}>
          <h2 className="mb-8 mt-4 text-center text-4xl font-bold md:text-6xl md:font-normal">
            Feel free to reach out
          </h2>
        </AnimateUpOnAppear>

        <AnimateUpOnAppear delay={0.2}>
          <div className="mx-auto flex max-w-xl flex-col space-y-8">
            <Form {...form}>
              <div>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <input
                            className={cn(
                              "peer w-full border-b-2 border-border bg-foreground/5 px-4 py-4 outline-none duration-150 focus:border-primary",
                            )}
                            placeholder=""
                            {...field}
                          />
                          <span
                            className={cn(
                              "absolute top-1/2 -translate-y-1/2 text-muted-foreground duration-150",
                              "-top-2 left-0 scale-75",
                              "peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100",
                            )}
                          >
                            Name
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <input
                            className={cn(
                              "peer w-full border-b-2 border-border bg-foreground/5 px-4 py-4 outline-none duration-150 focus:border-primary",
                            )}
                            placeholder=""
                            {...field}
                          />
                          <span
                            className={cn(
                              "absolute top-1/2 -translate-y-1/2 text-muted-foreground duration-150",
                              "-top-2 left-0 scale-75",
                              "peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100",
                            )}
                          >
                            Email
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <textarea
                            className={cn(
                              "peer h-32 w-full resize-none border-b-2 border-border bg-foreground/5 px-4 py-4 outline-none duration-150 focus:border-primary",
                            )}
                            placeholder=""
                            {...field}
                          />
                          <span
                            className={cn(
                              "absolute top-2 text-muted-foreground duration-150",
                              "-top-6 left-0 scale-75",
                              "peer-placeholder-shown:left-4 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100",
                            )}
                          >
                            Message
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={loading}
                size={"lg"}
                className="rounded-none text-white"
                onClick={form.handleSubmit(onSubmit)}
              >
                {loading ? "Sending..." : "Send Message"}
                <IoMdSend />
              </Button>
            </Form>
          </div>
        </AnimateUpOnAppear>
      </div>
    </section>
  );
};

export default Contact;
