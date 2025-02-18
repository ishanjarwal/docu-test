"use client";
import React, { useContext, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TwitterPicker } from "react-color";
import { Button } from "@/components/ui/button";
import { RxText } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";
import { BiSquareRounded } from "react-icons/bi";
import { IoColorFillOutline } from "react-icons/io5";
import { ResumeDataContext } from "../providers/ResumeData";
import { FaCrown, FaRegSquareFull } from "react-icons/fa6";
import { AiOutlineFontColors } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { TemplateSchema, TemplateValues } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { MdOutlineGridView } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { templateDefValues } from "@/validations/defaultValues";
import { fonts } from "../constants/fonts";
import { useTemplateSwitch } from "../providers/TemplateSwitchContext";
import { PiDrop } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { useSubscriptionLevel } from "@/features/premium/providers/SubscriptionLevelProvider";
import Link from "next/link";
import usePremiumFeatures from "@/features/premium/hooks/usePremiumFeatures";

const ThemeBar = () => {
  const subscriptionLevel = useSubscriptionLevel();
  const { canUseCustomizations } = usePremiumFeatures(subscriptionLevel);
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const { toggleOpen } = useTemplateSwitch();
  const form = useForm<TemplateValues>({
    mode: "onChange",
    resolver: zodResolver(TemplateSchema),
    defaultValues: resumeData.template || templateDefValues,
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        template: { ...values, templateId: resumeData.template.templateId },
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const borderStyles = ["circle", "square", "squircle"];
  const BorderIcon =
    resumeData.template.borderStyle === "square" ? (
      <FaRegSquareFull />
    ) : resumeData.template.borderStyle === "circle" ? (
      <FaRegCircle />
    ) : (
      <BiSquareRounded />
    );

  return (
    <div className="step5">
      {canUseCustomizations ? (
        <div className={cn("flex items-center justify-start space-x-2")}>
          <Form {...form}>
            <CustomTooltip
              text="Choose template"
              delayDuration={0}
              side={"bottom"}
              className="z-[1000]"
            >
              <Button
                onClick={toggleOpen}
                className="text-xs active:scale-90"
                variant="outline"
                size={"icon"}
              >
                <MdOutlineGridView />
              </Button>
            </CustomTooltip>
            <Popover>
              <CustomTooltip
                className="z-[1000]"
                text="Change accent color"
                delayDuration={0}
                side="bottom"
              >
                <PopoverTrigger>
                  <Button
                    className="active:scale-90"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <span>
                      <PiDrop />
                    </span>
                  </Button>
                </PopoverTrigger>
              </CustomTooltip>
              <PopoverContent
                className="z-[1000] border-none bg-transparent shadow-none"
                align="start"
              >
                <FormField
                  control={form.control}
                  name={"accentHex"}
                  render={({ field }) => (
                    <FormItem>
                      <TwitterPicker
                        color={field.value}
                        onChange={(color) => {
                          field.onChange(color.hex);
                        }}
                        triangle="top-left"
                        colors={[
                          "#000000",
                          "#FFFFFF",
                          "#333333",
                          "#F5F5F5",
                          "#FF5733",
                          "#28A745",
                          "#007BFF",
                          "#6F42C1",
                          "#FFC107",
                          "#DC3545",
                        ]}
                      />
                    </FormItem>
                  )}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <CustomTooltip
                className="z-[1000]"
                text="Change text color"
                delayDuration={0}
                side="bottom"
              >
                <PopoverTrigger>
                  <Button
                    className="active:scale-90"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <span>
                      <AiOutlineFontColors />
                    </span>
                  </Button>
                </PopoverTrigger>
              </CustomTooltip>
              <PopoverContent
                className="z-[1000] border-none bg-transparent shadow-none"
                align="start"
              >
                <FormField
                  control={form.control}
                  name={"textHex"}
                  render={({ field }) => (
                    <FormItem>
                      <TwitterPicker
                        color={field.value}
                        onChange={(color) => {
                          field.onChange(color.hex);
                        }}
                        triangle="top-left"
                        colors={[
                          "#000000",
                          "#FFFFFF",
                          "#333333",
                          "#F5F5F5",
                          "#FF5733",
                          "#28A745",
                          "#007BFF",
                          "#6F42C1",
                          "#FFC107",
                          "#DC3545",
                        ]}
                      />
                    </FormItem>
                  )}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <CustomTooltip
                className="z-[1000]"
                text="Change backdrop color"
                delayDuration={0}
                side="bottom"
              >
                <PopoverTrigger>
                  <Button
                    className="active:scale-90"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <span>
                      <IoColorFillOutline />
                    </span>
                  </Button>
                </PopoverTrigger>
              </CustomTooltip>
              <PopoverContent
                className="z-[10000] border-none bg-transparent shadow-none"
                align="start"
              >
                <FormField
                  control={form.control}
                  name={"backdropHex"}
                  render={({ field }) => (
                    <FormItem>
                      <TwitterPicker
                        onChange={(color) => {
                          field.onChange(color.hex);
                        }}
                        color={field.value}
                        triangle="top-left"
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
                          "#FFF7E6",
                        ]}
                      />
                    </FormItem>
                  )}
                />
              </PopoverContent>
            </Popover>
            <FormField
              control={form.control}
              name="borderStyle"
              render={({ field }) => (
                <CustomTooltip
                  className="z-[1000]"
                  text="Change border styles"
                  delayDuration={0}
                  side="bottom"
                >
                  <Button
                    className="active:scale-90"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const currStyle =
                        borderStyles.findIndex(
                          (el) => el === resumeData.template.borderStyle,
                        ) || 0;
                      const nextStyle = borderStyles[(currStyle + 1) % 3];
                      field.onChange(nextStyle);
                    }}
                  >
                    {BorderIcon}
                  </Button>
                </CustomTooltip>
              )}
            />
            <FormField
              name="fontFace"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={(value) => field.onChange(value)}>
                  <CustomTooltip
                    className="z-[1000]"
                    text="Change font"
                    delayDuration={0}
                    side="bottom"
                  >
                    <SelectTrigger className="!h-auto !w-auto p-0 focus:ring-0 [&>svg]:hidden">
                      <Button
                        className="active:scale-90"
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <span className="!flex items-center justify-center">
                          <RxText />
                        </span>
                      </Button>
                    </SelectTrigger>
                  </CustomTooltip>
                  <SelectContent className="z-[1000]">
                    {fonts.map((font, idx) => (
                      <SelectItem key={"font-" + idx} value={font.slug}>
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
          </Form>
        </div>
      ) : (
        <div
          className={cn("relative flex items-center justify-start space-x-2")}
        >
          <Link
            href={"/plans"}
            className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-foreground/50 text-white opacity-0 backdrop-blur-sm duration-100 hover:opacity-100"
          >
            <p className="flex items-center justify-center space-x-1 text-center">
              <span>Unlock customizations</span>
              <span className="text-yellow-400">
                <FaCrown />
              </span>
            </p>
          </Link>

          <Button variant="outline" size={"icon"}>
            <MdOutlineGridView />
          </Button>
          <Button variant="outline" size="icon" asChild>
            <span>
              <PiDrop />
            </span>
          </Button>

          <Button variant="outline" size="icon" asChild>
            <span>
              <AiOutlineFontColors />
            </span>
          </Button>

          <Button variant="outline" size="icon" asChild>
            <span>
              <IoColorFillOutline />
            </span>
          </Button>

          <Button variant="outline" size="icon">
            <FaRegCircle />
          </Button>

          <Button variant="outline" size="icon" asChild>
            <span className="!flex items-center justify-center">
              <RxText />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThemeBar;
