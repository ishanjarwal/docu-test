import {
  resumeSchemaType,
  SocialLinksValues,
  TemplateValues,
} from "./validation";

export const projectTitleDefValues = {
  title: "Untitled",
};

export const personalDetailsDefValues = {
  profilePicture: undefined,
  firstName: "",
  lastName: "",
  jobTitle: "",
  gender: "",
  phone: "",
  email: "",
  country: "",
  city: "",
  summary: "",
};

export const socialLinksDefValues: SocialLinksValues = {
  linkedin: "",
  instagram: "",
  github: "",
  website: "",
  twitter: "",
  threads: "",
  custom: [],
};

export const educationDetailsDefValues = {
  institution: "",
  degree: "",
  score: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

export const projectDetailsDefValues = {
  name: "",
  description: "",
  link: "",
  startDate: "",
  endDate: "",
};

export const workExperienceDefValues = {
  position: "",
  employer: "",
  description: "",
  jobType: undefined,
  location: "",
  startDate: "",
  endDate: "",
  current: false,
};

export const skillDefValues = {
  name: "",
  level: 0,
  levelDisabled: true,
};

export const certificationDefValues = {
  title: "",
  organization: "",
  link: "",
  score: "",
  description: "",
  startDate: "",
  endDate: "",
};

export const courseDefValues = {
  title: "",
  organization: "",
  link: "",
  score: "",
  description: "",
  startDate: "",
  endDate: "",
};

export const hobbyDefValues = {
  name: "",
  description: "",
};

export const templateDefValues: TemplateValues = {
  textHex: "#000000",
  accentHex: "#000000",
  backdropHex: "#FFFFFF",
  borderStyle: "squircle",
  templateId: "ats-template-1",
  fontFace: "Inter",
  fontSize: "small",
};

export const resumeDataDefValues: resumeSchemaType = {
  title: "Untitled",
  personalDetails: personalDetailsDefValues,
  socialLinks: socialLinksDefValues,
  educationDetails: [],
  workExperiences: [],
  hardSkills: [],
  softSkills: [],
  courses: [],
  projects: [],
  certifications: [],
  hobbies: [],
  template: templateDefValues,
};
