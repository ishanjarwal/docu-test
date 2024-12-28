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
    .custom<File | undefined>()
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

export const resumeSchema = z.object({
  ...projectTitleSchema.shape,
  ...personalDetailsSchema.shape,
});
export type resumeSchemaType = Omit<
  z.infer<typeof resumeSchema>,
  "profilePicture"
> & {
  id?: string;
  profilePicture?: File | string | null;
};
