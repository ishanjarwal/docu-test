// steps for retaining the current form in url params

import React, { ReactNode } from "react";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import EducationForm from "../forms/EducationForm";
import { EditorFormProps } from "./types";
import WorkExperienceForm from "../forms/WorkExperienceForm";
import SkillForm from "../forms/SkillForm";
import CertificationsForm from "../forms/CertificationsForm";
import CourseForm from "../forms/CourseForm";
import HobbyForm from "../forms/HobbyForm";
import SocialLinksForm from "../forms/SocialLinksForm";
import ProjectForm from "../forms/ProjectForm";
import AchievementForm from "../forms/AchievementForm";
import AwardForm from "../forms/AwardForm";
import { IoIosLink, IoMdAdd } from "react-icons/io";
import { PiMedalLight } from "react-icons/pi";
import {
  IoBookOutline,
  IoDiamondOutline,
  IoFootballOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { LuClipboardPen, LuShieldCheck } from "react-icons/lu";
import { TbUserStar } from "react-icons/tb";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
  icon: React.ReactElement;
}[] = [
  {
    title: "Personal Details",
    component: PersonalDetailsForm,
    key: "personal-details",
    icon: <IoPersonOutline />,
  },
  {
    title: "Social Links",
    component: SocialLinksForm,
    key: "social-links",
    icon: <IoIosLink />,
  },
  {
    title: "Educational Details",
    component: EducationForm,
    key: "education-details",
    icon: <IoSchoolOutline />,
  },
  {
    title: "Work Experiences",
    component: WorkExperienceForm,
    key: "work-experiences",
    icon: <TbUserStar />,
  },
  {
    title: "Skills",
    component: SkillForm,
    key: "skills",
    icon: <IoDiamondOutline />,
  },
  {
    title: "Projects",
    component: ProjectForm,
    key: "projects",
    icon: <LuClipboardPen />,
  },
  {
    title: "Certifications",
    component: CertificationsForm,
    key: "certifications",
    icon: <LuShieldCheck />,
  },
  {
    title: "Courses",
    component: CourseForm,
    key: "courses",
    icon: <IoBookOutline />,
  },
  {
    title: "Achievements",
    component: AchievementForm,
    key: "achievements",
    icon: <PiMedalLight />,
  },
  {
    title: "Awards",
    component: AwardForm,
    key: "awards",
    icon: <IoTrophyOutline />,
  },
  {
    title: "Hobbies",
    component: HobbyForm,
    key: "hobbies",
    icon: <IoFootballOutline />,
  },
];
