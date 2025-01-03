import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));
const validPhone = z
  .string()
  .refine(isValidPhoneNumber, { message: "Invalid phone number" })
  .optional();
export const projectTitleSchema = z.object({
  title: optionalString,
});

export const projectTitleDefValues = {
  title: "",
};

export type projectTitleType = z.infer<typeof projectTitleSchema>;

// Personal Details

export const personalDetailsSchema = z.object({
  profilePicture: z
    .custom<File | undefined | null>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "File must be an image",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File too large, upto 4MB acceptable",
    ),
  firstName: optionalString,
  lastName: optionalString,
  gender: optionalString,
  phone: validPhone,
  email: optionalString,
  country: optionalString,
  city: optionalString,
  bio: optionalString,
  linkedin: optionalString,
  instagram: optionalString,
  github: optionalString,
});

export const personalDetailsDefValues = {
  profilePicture: null,
  firstName: "",
  lastName: "",
  gender: undefined,
  dob: null,
  phone: "",
  email: null,
  linkedin: null,
  portfolio: null,
  instagram: null,
  github: null,
  bio: "",
  nationality: null,
};

export type personalDetailsType = z.infer<typeof personalDetailsSchema>;

export const EducationDetailsSchema = z.object({
  educationDetails: z
    .array(
      z.object({
        institution: optionalString,
        degree: optionalString,
        gpa: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        current: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type EducationDetailsType = z.infer<typeof EducationDetailsSchema>;

export const WorkExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        employer: optionalString,
        description: optionalString,
        jobType: z.enum(["on-site", "remote", "hybrid", ""]).optional(),
        location: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        current: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type WorkExperienceType = z.infer<typeof WorkExperienceSchema>;

export const SkillSchema = z.object({
  hardSkills: z
    .array(
      z.object({
        name: optionalString,
        level: z.number().min(0).max(100).optional(),
        levelDisabled: z.boolean().optional(),
      }),
    )
    .optional(),
  softSkills: z
    .array(
      z.object({
        name: optionalString,
        level: z.number().min(0).max(100).optional(),
        levelDisabled: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type SkillType = z.infer<typeof SkillSchema>;

export const CerificationsSchema = z.object({
  certifications: z
    .array(
      z.object({
        title: optionalString,
        organization: optionalString,
        link: optionalString,
        description: z.string().max(300).optional(),
      }),
    )
    .optional(),
});

export type CertificationType = z.infer<typeof CerificationsSchema>;

export const resumeSchema = z.object({
  ...projectTitleSchema.shape,
  ...personalDetailsSchema.shape,
  ...EducationDetailsSchema.shape,
  ...WorkExperienceSchema.shape,
  ...SkillSchema.shape,
  ...CerificationsSchema.shape,
});

export type resumeSchemaType = Omit<
  z.infer<typeof resumeSchema>,
  "profilePicture"
> & {
  id?: string;
  profilePicture?: File | string | null;
};
