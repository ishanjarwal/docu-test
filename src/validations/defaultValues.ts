import { SocialLinksValues } from "./validation";

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
  bio: "",
};

export const socialLinksDefValues: SocialLinksValues = {
  linkedin: "",
  instagram: "",
  github: "",
  website: "",
  twitter: "",
  threads: "",
  customSocialLinks: [],
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
  workExperiences: [
    {
      position: "",
      employer: "",
      description: "",
      jobType: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
    },
  ],
};

export const skillDefValues = {
  hardSkills: [
    {
      name: "",
      level: 0,
      levelDisabled: false,
    },
  ],
  softSkills: [
    {
      name: "",
      level: 0,
      levelDisabled: false,
    },
  ],
};

export const certificationDefValues = {
  certifications: [
    {
      title: "",
      organization: "",
      link: "",
      score: "",
      description: "",
    },
  ],
};

export const courseDefValues = {
  courses: [
    {
      title: "",
      organization: "",
      link: "",
      score: "",
      description: "",
    },
  ],
};

export const hobbyDefValues = {
  hobbies: [
    {
      name: "",
      description: "",
    },
  ],
};

export const templateDefValues = {
  templateId: "",
  textHex: "",
  backdropHex: "",
  borderStyle: "square", // Default value can be "circle", "square", or "squircle"
  fontFace: "",
};
