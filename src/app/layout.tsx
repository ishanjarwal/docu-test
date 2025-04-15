import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/features/theme_toggle/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ReactHotToaster } from "react-hot-toast";
import PremiumModal from "@/features/premium/components/PremiumModal";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | DOCU Resumes - Your AI Resume Builder",
    absolute: "DOCU Resumes - Your AI Resume Builder",
  },
  description:
    "ResumeBuildr – Create professional, ATS-friendly resumes in minutes with AI-powered tools. Personalize templates, optimize keywords, and stand out to land your dream job. Start building today!",
};
export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <ReactHotToaster
              position="bottom-center"
              containerClassName="z-[999999]"
            />
            {/* temporary */}
            <PremiumModal />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
