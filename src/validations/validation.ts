import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));

export const projectTitleSchema = z.object({
  title: optionalString,
});

export const projectTitleDefValues = {
  title: "",
};

export type projectTitleType = z.infer<typeof projectTitleSchema>;

// Personal Details

export const personalDetailsSchema = z.object({
  firstName: optionalString,
  lastName: optionalString,
  gender: optionalString,
});

export const personalDetailsDefValues = {
  profilePicture: null,
  firstName: "",
  lastName: "",
  gender: undefined,
  dob: null,
  phone: null,
  email: null,
  linkedin: null,
  portfolio: null,
  instagram: null,
  github: null,
  bio: "",
  nationality: null,
};

export type personalDetailsType = z.infer<typeof personalDetailsSchema>;
