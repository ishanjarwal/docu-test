import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/",
    icon: <FaInstagram />,
  },
  {
    name: "Twitter/X",
    link: "https://www.x.com/",
    icon: <FaXTwitter />,
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/",
    icon: <FaYoutube />,
  },
];

interface LinkType {
  heading: string;
  subLinks: Array<{ name: string; link?: string | undefined }>;
}

const links: Array<LinkType> = [
  {
    heading: "Company",
    subLinks: [
      {
        name: "About Us",
        link: "#",
      },
      {
        name: "Careers",
        link: "#",
      },
    ],
  },
  {
    heading: "Services",
    subLinks: [
      {
        name: "5+ Professional Templates",
      },
      {
        name: "AI Assistance",
      },
      {
        name: "User Friendly",
      },
      {
        name: "Auto Save",
      },
      {
        name: "Download PDF",
      },
    ],
  },
  {
    heading: "Helpful Links",
    subLinks: [
      {
        name: "Contact",
        link: "#contact",
      },
      {
        name: "How to use",
        link: "#contact",
      },
      {
        name: "Templates",
        link: "#contact",
      },
      {
        name: "Examples",
        link: "#contact",
      },
    ],
  },
  {
    heading: "Legal",
    subLinks: [
      {
        name: "Privacy Policy",
        link: "#",
      },
      {
        name: "Terms & Conditions",
        link: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="relative mx-auto max-w-screen-xl overflow-hidden px-4 py-16 pb-48 sm:px-6 lg:px-8">
        <p className="outlined_text absolute bottom-0 right-0 select-none text-[80px] leading-none opacity-50 md:text-[150px] lg:text-[200px]">
          DOCU.AI
        </p>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <p className="mt-4 max-w-xs text-sm text-gray-600">
              Create a Professional Documents and stand out the crowd. Our
              professional toolkit is designed to impress!
            </p>
            <div className="mt-8 flex space-x-2">
              <Button
                title="Contact"
                asChild
                className="rounded-xl"
                variant={"secondary"}
                size={"lg"}
              >
                <Link href={"#"}>Contact</Link>
              </Button>
              {socialLinks.map((item, index) => (
                <Button
                  title={item.name}
                  asChild
                  variant={"outline"}
                  className="rounded-xl !py-4"
                  key={index}
                >
                  <Link href={item.link}>
                    {React.cloneElement(item.icon, { className: "!size-6" })}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {links.map((item, index) => (
              <div key={"linkSection-" + index}>
                <p className="font-medium">{item.heading}</p>
                <nav className="mt-4 flex flex-col space-y-2 text-sm text-gray-500">
                  {item.subLinks.map((subItem, subIndex) =>
                    subItem?.link ? (
                      <Link
                        key={"subItem-" + subIndex}
                        className="hover:opacity-75"
                        href={subItem.link}
                      >
                        {" "}
                        {subItem.name}{" "}
                      </Link>
                    ) : (
                      <span
                        key={"subItem-" + subIndex}
                        className="hover:opacity-75"
                      >
                        {" "}
                        {subItem.name}{" "}
                      </span>
                    ),
                  )}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          © 2022 DOCU Intelligence Limited
        </p>
      </div>
    </footer>
  );
};

export default Footer;
