import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
