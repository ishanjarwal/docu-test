"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { images } from "@/constants/images";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTable, FaWandMagicSparkles } from "react-icons/fa6";
import {
  IoDocumentsOutline,
  IoDocumentTextOutline,
  IoGridOutline,
  IoMailOutline,
} from "react-icons/io5";

const data = [
  {
    title: "Documents",
    url: "/resumes",
    icon: <IoDocumentTextOutline />,
    slug: "resumes",
  },
  {
    title: "Customization",
    url: "/resumes/cover-letters",
    icon: <IoMailOutline />,
    slug: "cover-letters",
  },
  {
    title: "AI Review",
    url: "/resumes/ai-review",
    icon: <FaWandMagicSparkles />,
    slug: "ai-review",
  },
  {
    title: "Browse Templates",
    url: "/resumes/templates",
    icon: <IoGridOutline />,
    slug: "templates",
  },
  {
    title: "Samples",
    url: "/resumes/sample-resumes",
    icon: <IoDocumentsOutline />,
    slug: "sample-resumes",
  },
];

const DashboardSidebar = () => {
  const { open, setOpenMobile, isMobile } = useSidebar();
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const lastword = segments[segments.length - 1];
    console.log(lastword);
    setActive(lastword);
  }, [pathname]);

  return (
    <Sidebar className="border-none" collapsible="icon">
      <DashboardSidebarHeader />
      <SidebarContent className="bg-background-muted">
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup key={"items"}>
          {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
          <SidebarMenu>
            {data.map((item) => (
              <Link
                href={item.url}
                key={item.slug}
                onClick={() => {
                  if (isMobile) {
                    setOpenMobile(false);
                  }
                }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={cn(
                      "h-auto whitespace-nowrap py-2",
                      active === item.slug && "bg-foreground/10",
                    )}
                  >
                    <span className={cn("text-xl")}>{item.icon}</span>
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarRail /> */}
      <DashboardSidebarFooter />
    </Sidebar>
  );
};

export default DashboardSidebar;

const DashboardSidebarHeader = () => {
  return (
    <SidebarHeader className="bg-background-muted pt-4">
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <div>
              <div className="flex items-center justify-start space-x-2 overflow-hidden">
                <div className="relative aspect-square w-10 flex-shrink-0">
                  <Image
                    src={images.logo}
                    alt="logo"
                    fill
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <span className="whitespace-nowrap font-bold">
                  DOCU Resumes
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </SidebarHeader>
  );
};

const DashboardSidebarFooter = () => {
  const { open } = useSidebar();
  const { user } = useUser();
  return (
    <SidebarFooter className="bg-background-muted">
      <SidebarMenu>
        <SidebarMenuItem>
          {open ? (
            <SidebarMenuButton className="h-auto bg-foreground/5 py-2">
              <Link href="/profile" className="flex items-center space-x-2">
                <span className="relative aspect-square w-8 overflow-hidden rounded-full">
                  {user?.imageUrl && (
                    <Image fill src={user?.imageUrl} alt="user-avatar" />
                  )}
                </span>
                <div className="flex flex-col">
                  <span>{user?.username}</span>
                  <span className="text-xs">
                    {user?.emailAddresses[0].emailAddress}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          ) : (
            <Link href={"/profile"} className="flex items-center">
              <span className="relative aspect-square w-8 overflow-hidden rounded-full">
                {user?.imageUrl && (
                  <Image fill src={user?.imageUrl} alt="user-avatar" />
                )}
              </span>
            </Link>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
