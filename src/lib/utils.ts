import { resumeSchemaType } from "@/validations/validation";
import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        type: value.type,
        size: value.size,
      }
    : value;
}

export function mapToResumeSchemaType(
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  data: Prisma.ResumeGetPayload<{}>,
): resumeSchemaType {
  const {
    personalDetails,
    socialLinks,
    educationDetails,
    workExperiences,
    hardSkills,
    softSkills,
    certifications,
    courses,
    hobbies,
    template,
  } = data;

  const validJobTypes = ["on-site", "hybrid", "remote"] as const;

  return {
    id: data.id,
    title: data.title || undefined,
    personalDetails: {
      firstName: personalDetails.firstName || undefined,
      lastName: personalDetails.lastName || undefined,
      jobTitle: personalDetails.jobTitle || undefined,
      gender: personalDetails.gender || undefined,
      phone: personalDetails.phone || undefined,
      email: personalDetails.email || undefined,
      country: personalDetails.country || undefined,
      city: personalDetails.city || undefined,
      summary: personalDetails.summary || undefined,
      profilePicture: personalDetails.profilePicture || undefined,
    },
    educationDetails: educationDetails
      ? educationDetails.map((item) => ({
          institution: item.institution || undefined,
          current: item.current || undefined,
          degree: item.degree || undefined,
          description: item.description || undefined,
          endDate: item.endDate || undefined,
          score: item.score || undefined,
          startDate: item.startDate || undefined,
        }))
      : undefined,
    workExperiences: workExperiences
      ? workExperiences.map((item) => ({
          position: item.position || undefined,
          employer: item.employer || undefined,
          current: item.current || undefined,
          jobType: validJobTypes.includes(
            item.jobType as (typeof validJobTypes)[number],
          )
            ? (item.jobType as (typeof validJobTypes)[number])
            : undefined,
          description: item.description || undefined,
          endDate: item.endDate || undefined,
          startDate: item.startDate || undefined,
          location: item.location || undefined,
        }))
      : undefined,
    hardSkills: hardSkills
      ? hardSkills.map((item) => ({
          level: item.level || undefined,
          levelDisabled: item.levelDisabled == null || undefined,
          name: item.name || undefined,
        }))
      : undefined,
    softSkills: softSkills
      ? softSkills.map((item) => ({
          level: item.level || undefined,
          levelDisabled: item.levelDisabled == null || undefined,
          name: item.name || undefined,
        }))
      : undefined,
    socialLinks: {
      github: socialLinks.github || undefined,
      instagram: socialLinks.instagram || undefined,
      linkedin: socialLinks.linkedin || undefined,
      threads: socialLinks.threads || undefined,
      twitter: socialLinks.twitter || undefined,
      website: socialLinks.website || undefined,
      custom: socialLinks.custom.map((item) => ({
        label: item.label || undefined,
        link: item.link || undefined,
      })),
    },
    certifications: certifications.map((item) => ({
      description: item.description || undefined,
      link: item.link || undefined,
      organization: item.organization || undefined,
      score: item.score || undefined,
      title: item.title || undefined,
    })),
    courses: courses.map((item) => ({
      description: item.description || undefined,
      link: item.link || undefined,
      organization: item.organization || undefined,
      score: item.score || undefined,
      title: item.title || undefined,
    })),
    hobbies: hobbies.map((item) => ({
      description: item.description || undefined,
      name: item.name || undefined,
    })),
    template: {
      backdropHex: template.backdropHex || undefined,
      borderStyle: template.borderStyle || undefined,
      fontFace: template.fontFace || undefined,
      templateId: template.templateId || undefined,
      textHex: template.textHex || undefined,
    },
  };
}

export const isValidJSON = (input: string) => {
  try {
    JSON.parse(input);
    return true;
  } catch (e) {
    return false;
  }
};

export function convertToUlORP(input: string): string {
  // Check if the input contains bullet points
  const lines = input.split("\n").map((line) => line.trim());

  // Filter for lines that start with a bullet point "-"
  const bulletPoints = lines.filter((line) => line.startsWith("-"));

  if (bulletPoints.length > 0) {
    // If there are bullet points, wrap them in <ul> tags
    const listItems = bulletPoints
      .map((line) => `<li>${line.substring(1).trim()}</li>`) // Remove "-" and trim
      .join("");
    return `<ul class='list-disc ps-4'>${listItems}</ul>`;
  } else {
    // Otherwise, return the whole input wrapped in a <p> tag
    return `<p>${input.trim()}</p>`;
  }
}

function areAllFieldsDefined(obj: object): boolean {
  return Object.values(obj).every((value) => value !== undefined);
}

export function completionPercentage(resumeData: resumeSchemaType): number {
  // TODO : calculate the percentage of completion and return it
  let sum = 0;
  const {
    personalDetails,
    workExperiences,
    educationDetails,
    hardSkills,
    socialLinks,
  } = resumeData;
  if (personalDetails && areAllFieldsDefined(personalDetails)) {
    sum++;
  }
  if (workExperiences && workExperiences.length > 0) {
    sum++;
  }
  if (educationDetails && educationDetails.length > 0) {
    sum++;
  }
  if (hardSkills && hardSkills.length > 0) {
    sum++;
  }
  if (socialLinks && areAllFieldsDefined(socialLinks)) {
    sum++;
  }

  const percentage = (sum / 5) * 100;
  return percentage;
}
