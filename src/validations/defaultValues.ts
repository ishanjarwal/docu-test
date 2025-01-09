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
  levelDisabled: false,
};

export const certificationDefValues = {
  title: "",
  organization: "",
  link: "",
  score: "",
  description: "",
};

export const courseDefValues = {
  title: "",
  organization: "",
  link: "",
  score: "",
  description: "",
};

export const hobbyDefValues = {
  name: "",
  description: "",
};

export const templateDefValues: TemplateValues = {
  textHex: "#000000",
  backdropHex: "#FFFFFF",
  borderStyle: "squircle",
  templateId: "ats-template-1",
  fontFace: "Inter",
};

export const resumeDataDefValues: resumeSchemaType = {
  title: "Untitled",
  personalDetails: personalDetailsDefValues,
  socialLinks: socialLinksDefValues,
  educationDetails: [educationDetailsDefValues],
  workExperiences: [workExperienceDefValues],
  hardSkills: [skillDefValues],
  softSkills: [skillDefValues],
  courses: [courseDefValues],
  certifications: [certificationDefValues],
  hobbies: [hobbyDefValues],
  template: templateDefValues,
};
