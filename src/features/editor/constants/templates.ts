import ATSTemplate1 from "@/features/templates/ats/ats_template_1/ATSTemplate1";
import ModernTemplate1 from "@/features/templates/modern/modern_template_1/ModernTemplate1";
import ProfessionalTemplate1 from "@/features/templates/professional/professional-template-1/ProfessionalTemplate1";
import SimpleTemplate1 from "@/features/templates/simple/simple-template-1/SimpleTemplate1";
import { TemplateProps } from "@/features/templates/types";
import { TemplateValues } from "@/validations/validation";
import React from "react";

interface ChooseTemplateProps {
  id: string;
  name: string;
  template: (props: TemplateProps) => React.JSX.Element;
  sample_img: string;
  accentHex: string;
  textHex: string;
  backdropHex: string;
  borderStyle: TemplateValues["borderStyle"];
  fontFace: string;
}

export const templates: ChooseTemplateProps[] = [
  {
    id: "ats-template-1",
    name: "Simple ATS",
    template: ATSTemplate1,
    sample_img: "/ats-template-1.png",
    accentHex: "#333333",
    textHex: "#000000",
    backdropHex: "#ffffff",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "ats-template-2",
    name: "Simple ATS",
    template: ATSTemplate1,
    sample_img: "/ats-template-2.png",
    accentHex: "#FF5733",
    textHex: "#000000",
    backdropHex: "#ffffff",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "ats-template-3",
    name: "Simple ATS",
    template: ATSTemplate1,
    sample_img: "/ats-template-3.png",
    accentHex: "#007BFF",
    textHex: "#000000",
    backdropHex: "#ffffff",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "modern-template-1",
    name: "Modern",
    template: ModernTemplate1,
    sample_img: "/modern-template-1.png",
    accentHex: "#333333",
    textHex: "#000000",
    backdropHex: "#ffffff",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "modern-template-2",
    name: "Modern",
    template: ModernTemplate1,
    sample_img: "/modern-template-2.png",
    accentHex: "#DC3545",
    textHex: "#000000",
    backdropHex: "#FEE2E2",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "modern-template-3",
    name: "Modern",
    template: ModernTemplate1,
    sample_img: "/modern-template-3.png",
    accentHex: "#28A745",
    textHex: "#000000",
    backdropHex: "#E2F0CB",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "professional-template-1",
    name: "Professional",
    template: ProfessionalTemplate1,
    sample_img: "/professional-template-1.png",
    accentHex: "#174332",
    textHex: "#000000",
    backdropHex: "#ffffff",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "professional-template-2",
    name: "Professional",
    template: ProfessionalTemplate1,
    sample_img: "/professional-template-2.png",
    accentHex: "#233c66",
    textHex: "#000000",
    backdropHex: "#ffffff",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "professional-template-3",
    name: "Professional",
    template: ProfessionalTemplate1,
    sample_img: "/professional-template-3.png",
    accentHex: "#631a31",
    textHex: "#000000",
    backdropHex: "#ffffff",
    borderStyle: "circle",
    fontFace: "aesthetic_beauty",
  },
  {
    id: "simple-template-1",
    name: "Simple",
    template: SimpleTemplate1,
    sample_img: "/simple-template-1.png",
    accentHex: "#f5f5f5",
    textHex: "#000000",
    backdropHex: "#ffffff",
    borderStyle: "square",
    fontFace: "comfortaa_regular",
  },
  {
    id: "simple-template-2",
    name: "Simple",
    template: SimpleTemplate1,
    sample_img: "/simple-template-2.png",
    accentHex: "#FFC107",
    textHex: "#000000",
    backdropHex: "#FFF3CD",
    borderStyle: "square",
    fontFace: "comfortaa_regular",
  },
  {
    id: "simple-template-3",
    name: "Simple",
    template: SimpleTemplate1,
    sample_img: "/simple-template-3.png",
    accentHex: "#89B6FF",
    textHex: "#000000",
    backdropHex: "#EAF4FC",
    borderStyle: "square",
    fontFace: "comfortaa_regular",
  },
];
