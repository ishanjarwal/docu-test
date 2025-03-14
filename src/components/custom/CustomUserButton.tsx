"use client";
import ActivePlan from "@/features/stripe/components/ActivePlan";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { FaCrown } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
import { LiaUserLockSolid } from "react-icons/lia";

const CustomUserButton = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <UserButton
      appearance={{
        baseTheme:
          theme === "dark" || (systemTheme === "dark" && theme === "system")
            ? dark
            : undefined,
        elements: {
          avatarBox: "w-8 h-8",
        },
      }}
    >
      <UserButton.UserProfilePage
        label="My plan"
        url={"/user/active-plan"}
        labelIcon={<LiaUserLockSolid />}
      >
        <ActivePlan />
      </UserButton.UserProfilePage>
      <UserButton.MenuItems>
        <UserButton.Link
          label={"Upgrade now"}
          labelIcon={<FaCrown className="text-yellow-200" />}
          href="/plans"
        />
        <UserButton.Link
          label={"My Resumes"}
          labelIcon={<HiOutlineDocumentText />}
          href="/resumes"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default CustomUserButton;
