"use server";

import transporter from "@/lib/mail";
import { ContactFormSchema, ContactFormValues } from "./validation";
import { env } from "@/env";

export const sendEmail = async (data: ContactFormValues) => {
  try {
    // TODO : rate limiting

    const { name, message, email } = ContactFormSchema.parse(data);
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: env.EMAIL_USER,
      subject: "New contact form submission from Resume Builder",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    return { success: true, message: "Email sent" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Email not sent" };
  }
};
