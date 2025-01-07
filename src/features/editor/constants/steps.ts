// steps for retaining the current form in url params

import React from "react";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import EducationForm from "../forms/EducationForm";
import { EditorFormProps } from "./types";
import WorkExperienceForm from "../forms/WorkExperienceForm";
import SkillForm from "../forms/SkillForm";
import CertificationsForm from "../forms/CertificationsForm";
import CourseForm from "../forms/CourseForm";
import HobbyForm from "../forms/HobbyForm";
import SocialLinksForm from "../forms/SocialLinksForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "Personal Details",
    component: PersonalDetailsForm,
    key: "personal-details",
  },
  {
    title: "Social Links",
    component: SocialLinksForm,
    key: "social-links",
  },
  {
    title: "Educational Details",
    component: EducationForm,
    key: "education-details",
  },
  {
    title: "Work Experiences",
    component: WorkExperienceForm,
    key: "work-experiences",
  },
  {
    title: "Skills",
    component: SkillForm,
    key: "skills",
  },
  {
    title: "Certifications",
    component: CertificationsForm,
    key: "certifications",
  },
  {
    title: "Courses",
    component: CourseForm,
    key: "courses",
  },
  {
    title: "Hobbies",
    component: HobbyForm,
    key: "hobbies",
  },
];
