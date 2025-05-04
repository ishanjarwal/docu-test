"use server";

import { auth } from "@clerk/nextjs/server";
import { canUseAI } from "../premium/actions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";
import { isValidJSON } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { templateDefValues } from "@/validations/defaultValues";

export async function generateResumeFromPrompt(input: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthorized");
    }
    const AIAccess = await canUseAI(userId);
    if (!AIAccess) {
      return { error: "Upgrade your plan to Pro to use AI" };
    }

    const prompt = `
    You are an AI Resume generator. Create a professional resume in under 450 - 600 words based on the data provided by the user. keep the language very professional.
    For the descriptions in education details and work experiences, use bullet points represented by '-' and new line for every point.

    Data provided by user : ${input}
    Always provide a structured JSON response and put dummy values and placeholders wherever you feel lack of information.
    Response schema :
    {
      isVague: boolean(required, if the data provided by the user is not sufficient)
      isVulgar: boolean(required, if there is vulgarity/voilence/illegal things in the prompt)
      content : {
          "title": "string", // Required

          "personalDetails": {
            "firstName": "string", // Required, use dummy names if not provided
            "lastName": "string", // Required, use dummy names if not provided
            "jobTitle": "string", // Optional
            "gender": "enum: ['male', 'female', 'other']", // Optional
            "phone": "string", // Optional
            "email": "string", // Required
            "country": "string", // Optional
            "city": "string", // Optional
            "summary": "string" // Required, max length 1000
          },

          "socialLinks": {
            "linkedin": "string", // Optional, must be valid URL
            "github": "string", // Optional, must be valid URL
            "twitter": "string", // Optional, must be valid URL
            "instagram": "string", // Optional, must be valid URL
            "custom": [
              {
                "label": "string", // Required
                "link": "string" // Required, must be valid URL
              }
            ] // Optional
          },

          "educationDetails": [
            {
              "institution": "string", // Required
              "degree": "string", // Optional
              "score": "string", // Optional
              "startDate": "string", // Optional, in MMM yyyy (eg: May 2024)
              "endDate": "string", // Optional, in MMM yyyy (eg: May 2024)
              "current": "boolean" // Required
            }
          ],

          "workExperiences": [
            {
              "position": "string", // Required
              "employer": "string", // Required
              "description": "string", // Optional, max length 1000
              "startDate": "date", // Optional, in MMM yyyy (eg: May 2024)
              "endDate": "date", // Optional, in MMM yyyy (eg: May 2024)
              "jobType": "enum: ['remote', 'on-site', 'hybrid']", // Optional
              "current": "boolean" // Required
            }
          ],

          "projects": [
            {
              "name": "string", // Required
              "link": "string", // Optional, must be valid URL
              "description": "string", // Optional, max length 1000
              "startDate": "date", // Optional, in MMM yyyy (eg: May 2024)
              "endDate": "date" // Optional, in MMM yyyy (eg: May 2024)
            }
          ],

          "hardSkills": [
            {
              "name": "string", // Required
              "level": "int", // Required, 1-5 range
              "levelDisabled": "boolean" // Optional default false
            }
          ],

          "softSkills": [
            {
              "name": "string", // Required
              "level": "int", // Required, 1-5 range
              "levelDisabled": "boolean" // Optional default false
            }
          ],

          "certifications": [
            {
              "title": "string", // Required
              "organization": "string", // Optional
              "link": "string", // Optional, must be valid URL
              "score": "string", // Optional
              "description": "string" // Optional, max length 1000
            }
          ],

          "courses": [
            {
              "title": "string", // Required
              "organization": "string", // Optional
              "link": "string", // Optional, must be valid URL
              "description": "string" // Optional, max length 1000
            }
          ],

          "hobbies": [
            {
              "name": "string", // Required
              "description": "string" // Optional, max length 500
            }
          ],
};
    }
    if isVague is true, then content should be null
    Return an Object only.
    `;

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(prompt);
    if (!result || !isValidJSON(result.response.text())) {
      return { error: "AI was unable to create response" };
    }
    if (JSON.parse(result.response.text()).isVague) {
      return {
        error:
          "Please provide necessary information like job title, educations and work experiences",
      };
    }
    if (JSON.parse(result.response.text()).isVulgar) {
      return { error: "Please remove vulgarity from the content you provided" };
    }
    console.log(JSON.parse(result.response.text()));

    // save the resume and return the id
    const newResume = await prisma.resume.create({
      data: {
        userId,
        ...JSON.parse(result.response.text())?.content,
        template: templateDefValues,
      },
    });

    return { success: newResume.id };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unexpected error occurred",
    };
  }
}
