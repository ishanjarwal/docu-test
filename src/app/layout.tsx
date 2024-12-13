import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | ResumeBuildr - Your AI Resume Builder",
    absolute: "ResumeBuildr - Your AI Resume Builder",
  },
  description:
    "ResumeBuildr – Create professional, ATS-friendly resumes in minutes with AI-powered tools. Personalize templates, optimize keywords, and stand out to land your dream job. Start building today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
