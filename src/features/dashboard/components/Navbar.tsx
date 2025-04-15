"use client";
import CustomUserButton from "@/components/custom/CustomUserButton";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { images } from "@/constants/images";
import ThemeToggleButton from "@/features/theme_toggle/components/ThemeToggleButton";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FaCrown } from "react-icons/fa6";
import { FiSidebar } from "react-icons/fi";
import SearchInput from "./SearchInput";
const Navbar = () => {
  const { isSignedIn } = useUser();
  const { isMobile } = useSidebar();
  return (
    <div className="sticky top-0 flex h-16 items-center border-b bg-background">
      <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between space-x-4 px-4">
        <div>
          <div className="flex items-center space-x-2">
            <SidebarTrigger
              size={"default"}
              className="py-4"
              variant={isMobile ? "secondary" : "ghost"}
            >
              <FiSidebar />
            </SidebarTrigger>
            {isMobile && (
              <div className="flex items-center justify-start space-x-2 overflow-hidden">
                <div className="relative aspect-square w-8 flex-shrink-0 bg-background">
                  <Image src={images.logo} alt="logo" fill />
                </div>
                <span className="hidden font-bold md:block">ResumeBuildr</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-2 md:gap-x-4">
          <SearchInput />
          <div className="flex-1">
            <ThemeToggleButton />
          </div>
          {!isSignedIn && (
            <Button
              className="h-6 rounded-full border border-white px-2 text-xs font-bold text-white shadow-md hover:scale-105 hover:shadow-xl md:h-9 md:border-2 md:px-4"
              asChild
            >
              <Link href="/plans">
                <FaCrown className="text-yellow-200" />
                <span>
                  <span>Upgrade</span>
                  <span className="hidden md:inline">&nbsp;Now</span>
                </span>
              </Link>
            </Button>
          )}
          <CustomUserButton />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
