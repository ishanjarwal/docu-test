"use client";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import usePremiumFeatures from "@/features/premium/hooks/usePremiumFeatures";
import { useSubscriptionLevel } from "@/features/premium/providers/SubscriptionLevelProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { TwitterPicker } from "react-color";
import { AiOutlineFontColors, AiOutlineFontSize } from "react-icons/ai";
import { BiSquareRounded } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { FaCrown, FaRegSquareFull } from "react-icons/fa6";
import { IoColorFillOutline } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import { PiDrop } from "react-icons/pi";
import { RxText } from "react-icons/rx";
import { fonts, fontSizes } from "../constants/fonts";
import { ResumeDataContext } from "../providers/ResumeData";
import { useTemplate } from "../providers/TemplateContext";

const ThemeBar = () => {
  const subscriptionLevel = useSubscriptionLevel();
  const { canUseCustomizations } = usePremiumFeatures(subscriptionLevel);
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const { toggleOpen, form } = useTemplate();
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
                          "#1D3557", // Dark Navy Blue
                          "#800020", // Dark Maroon
                          "#556B2F", // Olive Green
                          "#2C3E50", // Charcoal Gray
                          "#4B0082", // Indigo
                          "#2F4F4F", // Dark Slate Gray
                          "#8B4513", // Saddle Brown
                          "#3E2723", // Dark Coffee
                          "#37474F", // Blue Gray
                          "#3B3B3B", // Onyx Black
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
                          "#2E2E2E", // Very Dark Gray
                          "#4A4A4A", // Dark Gray
                          "#3B3B3B", // Onyx Black
                          "#1C1C1C", // Almost Black
                          "#2C3E50", // Charcoal Gray
                          "#2F4F4F", // Dark Slate Gray
                          "#3E2723", // Dark Coffee
                          "#4B0082", // Indigo (For subtle highlights)
                          "#4F4F4F", // Medium Dark Gray
                          "#5D5D5D", // Gray with a hint of warmth
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
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={resumeData.template.fontFace}
                  value={resumeData.template.fontFace}
                >
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
            <FormField
              name="fontSize"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={(value) => field.onChange(value)}>
                  <CustomTooltip
                    className="z-[1000]"
                    text="Change font size"
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
                          <AiOutlineFontSize />
                        </span>
                      </Button>
                    </SelectTrigger>
                  </CustomTooltip>
                  <SelectContent className="z-[1000]">
                    {fontSizes.map((size, idx) => (
                      <SelectItem key={"font-" + idx} value={size.slug}>
                        <span>{size.name}</span>
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

          <Button variant="outline" size="icon" asChild>
            <span className="!flex items-center justify-center">
              <AiOutlineFontSize />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThemeBar;
