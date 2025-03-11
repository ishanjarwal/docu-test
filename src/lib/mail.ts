import { env } from "@/env";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const nodeMailerOptions: SMTPTransport.Options = {
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.EMAIL_USER, // Admin Gmail ID
    pass: env.EMAIL_PASS, // Admin Gmail Password
  },
};

const transporter = nodemailer.createTransport(nodeMailerOptions);

export default transporter;
