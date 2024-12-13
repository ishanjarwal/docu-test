import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",  
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template:"%s | ResumeBuildr - Your AI Resume Builder",
    absolute:"ResumeBuildr - Your AI Resume Builder"
  },
  description: "ResumeBuildr – Create professional, ATS-friendly resumes in minutes with AI-powered tools. Personalize templates, optimize keywords, and stand out to land your dream job. Start building today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
