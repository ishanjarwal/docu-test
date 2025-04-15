"use client";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import usePremiumFeatures from "@/features/premium/hooks/usePremiumFeatures";
import { useSubscriptionLevel } from "@/features/premium/providers/SubscriptionLevelProvider";
import { cn } from "@/lib/utils";
import { TemplateValues } from "@/validations/validation";
import { useContext, useEffect } from "react";
import { SketchPicker } from "react-color";
import { ControllerRenderProps } from "react-hook-form";
import { BiSquareRounded } from "react-icons/bi";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCrown,
  FaRegCircle,
  FaRegSquareFull,
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import { fonts, fontSizes } from "../constants/fonts";
import { ResumeDataContext } from "../providers/ResumeData";
import { useTemplate } from "../providers/TemplateContext";
import Preview from "./Preview";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const StylingSidebar = () => {
  const { isMobile, toggleSidebar } = useSidebar();

  const { toggleOpen, form } = useTemplate();
  const subscriptionLevel = useSubscriptionLevel();
  const { canUseCustomizations } = usePremiumFeatures(subscriptionLevel);
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        template: { ...values },
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { theme, systemTheme } = useTheme();

  const borderStyles = [
    {
      id: "circle",
      icon: <FaRegCircle />,
    },
    {
      id: "square",
      icon: <FaRegSquareFull />,
    },
    {
      id: "squircle",
      icon: <BiSquareRounded />,
    },
  ];

  return (
    <Sidebar side="right" mobileFullWidth={true}>
      <SidebarContent
        className={cn(
          "bg-background p-4",
          "scrollbar-thumb-card-foreground/25 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-card-foreground/50",
        )}
      >
        {canUseCustomizations ? (
          <Form {...form}>
            <div className="relative">
              {isMobile && (
                <Button
                  onClick={toggleSidebar}
                  className="absolute right-2 top-2 h-auto px-2"
                  variant={"secondary"}
                >
                  <IoClose />
                </Button>
              )}
              <h1 className="text-xl font-semibold">Styling</h1>
              <p className="text-xs text-muted-foreground">
                Style your resume according to your needs.
              </p>
            </div>

            {isMobile && (
              <>
                <Separator className="my-4" />

                <ScrollArea className="min-h-64">
                  <div className="border border-border p-2">
                    <Preview />
                  </div>
                </ScrollArea>
              </>
            )}

            <Separator className="my-4" />

            <div className="flex flex-col space-y-2">
              <h2 className="text-sm">Template</h2>
              <CustomTooltip text="Change templates" delayDuration={0}>
                <Button
                  onClick={toggleOpen}
                  variant={"secondary"}
                  className="w-full"
                >
                  <MdOutlineGridView />
                  Change Template
                </Button>
              </CustomTooltip>
            </div>

            {/* border style */}
            <Separator className="my-4" />
            <div>
              <CustomTooltip text="Change border style" delayDuration={0}>
                <h2 className="mb-2 text-sm">Border style</h2>
              </CustomTooltip>
              <FormField
                name="borderStyle"
                control={form.control}
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-2">
                    {borderStyles.map((bs) => (
                      <CustomTooltip
                        text={bs.id.toUpperCase()}
                        delayDuration={0}
                      >
                        <span
                          onClick={() => {
                            field.onChange(bs.id);
                          }}
                          key={bs.id}
                          className={cn(
                            "flex cursor-pointer items-center justify-center rounded-lg border border-border py-2 shadow-xl duration-150 hover:scale-110",
                            field.value == bs.id && "border-2 border-primary",
                          )}
                        >
                          {bs.icon}
                        </span>
                      </CustomTooltip>
                    ))}
                  </div>
                )}
              />
            </div>
            {/* font and text */}
            <Separator className="my-4" />
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-8">
                <div>
                  <h3 className="mb-2 text-sm">Font</h3>
                  <div>
                    <FormField
                      name="fontFace"
                      control={form.control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={resumeData.template.fontFace}
                          value={resumeData.template.fontFace}
                        >
                          <CustomTooltip
                            text="Change font"
                            delayDuration={0}
                            side="bottom"
                          >
                            <SelectTrigger className="focus:ring-0">
                              <span
                                style={{ fontFamily: field.value }}
                                className="capitalize"
                              >
                                {field.value ? field.value : "Select a font"}
                              </span>
                            </SelectTrigger>
                          </CustomTooltip>
                          <SelectContent>
                            {fonts.map((font, idx) => (
                              <SelectItem
                                className="cursor-pointer"
                                key={"font-" + idx}
                                value={font.slug}
                              >
                                <span
                                  style={{
                                    fontFamily: font.slug,
                                  }}
                                >
                                  {font.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm">Text size</h3>
                  <div>
                    <FormField
                      name="fontSize"
                      control={form.control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <CustomTooltip
                            text="Change font size"
                            delayDuration={0}
                            side="bottom"
                          >
                            <SelectTrigger className="focus:ring-0">
                              <span className="capitalize">
                                {field.value ? field.value : "Select size"}
                              </span>
                            </SelectTrigger>
                          </CustomTooltip>
                          <SelectContent>
                            {fontSizes.map((size, idx) => (
                              <SelectItem
                                key={"font-" + idx}
                                value={size.slug}
                                className="cursor-pointer"
                              >
                                <span>{size.name}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <CustomTooltip
                    text="Change text color"
                    delayDuration={0}
                    side="bottom"
                  >
                    <h2 className="mb-2 text-sm">Text color</h2>
                  </CustomTooltip>
                  <div>
                    <FormField
                      control={form.control}
                      name={"textHex"}
                      render={({ field }) => (
                        <FormItem>
                          <CustomColorPicker
                            colors={[
                              "#2E2E2E", // Very Dark Gray
                              "#4A4A4A", // Dark Gray
                              "#3B3B3B", // Onyx Black
                              "#1C1C1C", // Almost Black
                              "#2C3E50", // Charcoal Gray
                              "#2F4F4F", // Dark Slate Gray
                              "#3E2723", // Dark Coffee
                              "#4B0082", // Indigo (For subtle highlights)
                              "#4F4F4F", // Medium Dark Gray
                            ]}
                            field={field}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme/accent color */}
            <Separator className="my-4" />
            <div className="flex flex-col space-y-2">
              <CustomTooltip
                text="Change accent color"
                delayDuration={0}
                side="bottom"
              >
                <h2 className="mb-2 text-sm">Theme color</h2>
              </CustomTooltip>
              <div>
                <FormField
                  control={form.control}
                  name={"accentHex"}
                  render={({ field }) => (
                    <FormItem>
                      <CustomColorPicker
                        colors={[
                          "#1D3557", // Dark Navy Blue
                          "#800020", // Dark Maroon
                          "#556B2F", // Olive Green
                          "#2C3E50", // Charcoal Gray
                          "#4B0082", // Indigo
                          "#2F4F4F", // Dark Slate Gray
                          "#8B4513", // Saddle Brown
                          "#3E2723", // Dark Coffee
                          "#37474F", // Blue Gray
                        ]}
                        field={field}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-4" />
            <div className="flex flex-col space-y-2">
              <CustomTooltip
                text="Change background color"
                delayDuration={0}
                side="bottom"
              >
                <h2 className="mb-2 text-sm">Background color</h2>
              </CustomTooltip>
              <div>
                <FormField
                  control={form.control}
                  name={"backdropHex"}
                  render={({ field }) => (
                    <FormItem>
                      <CustomColorPicker
                        colors={[
                          "#FFFFFF",
                          "#F8F9FA",
                          "#E9ECEF",
                          "#FFF3CD",
                          "#E2F0CB",
                          "#D1ECF1",
                          "#FEE2E2",
                          "#EAF4FC",
                          "#F6E6E9",
                        ]}
                        field={field}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Form>
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center">
            <Image
              src={
                theme === "dark" ||
                (theme === "system" && systemTheme === "dark")
                  ? "/styling_sidebar_placeholder.png"
                  : "/styling_sidebar_placeholder_light.png"
              }
              alt="placeholder for styling sidebar"
              fill
              className="h-full w-full object-cover object-center blur-sm"
            />
            <div className="relative">
              <FaCrown className="mx-auto text-yellow-400" size={32} />
              <h1 className="text-center text-2xl font-semibold">
                Buy Premium
              </h1>
              <p className="text-center text-sm text-muted-foreground">
                Buy a subscription to customize your Resumes
              </p>
              <div className="mt-2 flex items-center justify-center">
                {isMobile && (
                  <Button
                    onClick={toggleSidebar}
                    className="me-2"
                    variant={"secondary"}
                  >
                    <FaArrowLeft />
                    Back
                  </Button>
                )}
                <Link
                  href="/plans"
                  className="flex items-center justify-center space-x-2 rounded-lg bg-foreground px-3 py-2 text-sm text-background duration-150 hover:bg-primary"
                >
                  <span>View Plans</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default StylingSidebar;

const CustomColorPicker = ({
  colors,
  field,
}: {
  colors: string[];
  field: ControllerRenderProps<TemplateValues>;
}) => {
  return (
    <div className="grid grid-cols-5 gap-x-8 gap-y-4">
      {colors.map((color) => (
        <span
          onClick={() => {
            field.onChange(color);
          }}
          key={"color-" + color}
          className={cn(
            "aspect-square cursor-pointer rounded-full border border-border duration-75 hover:scale-110",
            color === field.value && "scale-110 border-2 border-primary",
          )}
          style={{ backgroundColor: color }}
        ></span>
      ))}
      <CustomTooltip text="Custom color" delayDuration={0}>
        <Popover>
          <PopoverTrigger asChild>
            <span className="aspect-square cursor-pointer rounded-full bg-gradient-to-br from-sky-500 via-pink-500 to-lime-400 duration-75 hover:scale-110"></span>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-auto border-none bg-transparent p-0"
          >
            <SketchPicker
              onChange={(color) => {
                field.onChange(color.hex);
              }}
              color={field.value}
              presetColors={[]}
            />
          </PopoverContent>
        </Popover>
      </CustomTooltip>
    </div>
  );
};
