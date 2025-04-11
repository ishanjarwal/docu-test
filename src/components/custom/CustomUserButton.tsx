"use client";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { FaCrown } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";

const CustomUserButton = ({ defaultOpen }: { defaultOpen?: boolean }) => {
  const { theme, systemTheme } = useTheme();

  return (
    <UserButton
      defaultOpen={defaultOpen && defaultOpen}
      userProfileUrl="/profile"
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
      <UserButton.MenuItems>
        <UserButton.Link
          label={"Upgrade/Manage Subscriptions"}
          labelIcon={<FaCrown />}
          href="/profile/active-plan"
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
