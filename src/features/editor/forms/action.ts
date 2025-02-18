"use server";

import { env } from "@/env";
import { canUseAI } from "@/features/premium/actions";
import { isValidJSON } from "@/lib/utils";
import {
  GenerateEducationDetailsSchema,
  GenerateEducationDetailsValues,
  GenerateHobbiesSchema,
  GenerateHobbiesValues,
  GenerateSkillsSchema,
  GenerateSkillsValues,
  GenerateSummaryValues,
  GenerateWorkExperienceSchema,
  GenerateWorkExperienceValues,
} from "@/validations/validation";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummary(input: GenerateSummaryValues) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthorized");
    }
    const AIAccess = await canUseAI(userId);
    if (!AIAccess) {
      return { error: "Upgrade your plan to Pro to use AI" };
    }

    const { jobTitle, educationDetails, workExperiences } = input;

    const prompt = `
    You are an AI Resume generator. Create a professional summary in under 50 - 100 words based on the data provided by the user. keep the language very professional and concise.
    Create it in bullet points represented by '-' and new line for every point

    Data provided by user :
    role : ${jobTitle || "N/A"}
    educations: ${
      (educationDetails &&
        educationDetails
          .map(
            (item) =>
              `${item.degree} degree from ${item.institution} in year ${item.endDate || "current"}`,
          )
          .join("\n\n")) ||
      "N/A"
    }
      workExperiences: ${
        (workExperiences &&
          workExperiences
            .map(
              (item) =>
                `${item.position} at ${item.employer} in year ${item.endDate || "current"}`,
            )
            .join("\n\n")) ||
        "N/A"
      }
    Always provide a structured JSON response.
    Response schema :
    {
      isVague: boolean(required, if the content provided is not sufficient)
      isVulgar: boolean(required, if there is vulgarity/voilence/illegal things in the prompt)
      content : string/null (the generated text. show null if isVague or isVulgar is true);
    }
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
    return { success: JSON.parse(result.response.text()) };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unexpected error occurred",
    };
  }
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceValues,
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthorized");
    }
    const AIAccess = await canUseAI(userId);
    if (!AIAccess) {
      return { error: "Upgrade your plan to Pro to use AI" };
    }

    const { description } = GenerateWorkExperienceSchema.parse(input);

    const prompt = `
    You are an AI Resume generator. Create a work experience object based on the description provided by the user. keep the language very professional and concise.

    description provided by user : 
    description : ${description}

    Always provide a structured JSON response.
    Response schema :
    {
      isVague: boolean(required, if the description provided is not sufficient)
      isVulgar: boolean(required, if there is vulgarity/voilence/illegal things in the prompt)
      content : object/null (the generated object. show null if isVague or isVulgar is true) : {
        startDate: date string(yyyy-mm-dd) or don't include (job joining date);
        endDate: date string(yyyy-mm-dd) or don't include (job end date);
        current: boolean or don't include (if working here currently);
        description: string or don't include (learnings/experiences at the institution between 30 - 80 words in bullet points (-) and seperate lines);
        position: string or don't include;
        employer: string or don't include;
        jobType: enum["on-site", "remote", "hybrid"] or don't include;
        location: string or don't include (provide only if jobType is on-site);
      }
    }
    Return an Object only.
    and don't ever use null, instead, remove that field from the response
    `;

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(prompt);

    console.log(result.response.text());

    if (!result || !isValidJSON(result.response.text())) {
      return { error: "AI was unable to create response" };
    }
    if (JSON.parse(result.response.text()).isVague) {
      return {
        error: "Please provide relevant information only",
      };
    }
    if (JSON.parse(result.response.text()).isVulgar) {
      return { error: "Please remove vulgarity from the content you provided" };
    }
    console.log(JSON.parse(result.response.text()));
    return { success: JSON.parse(result.response.text()) };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unexpected error occurred",
    };
  }
}

export async function generateEducationDetails(
  input: GenerateEducationDetailsValues,
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthorized");
    }
    const AIAccess = await canUseAI(userId);
    if (!AIAccess) {
      return { error: "Upgrade your plan to Pro to use AI" };
    }

    const { description } = GenerateEducationDetailsSchema.parse(input);

    const prompt = `
    You are an AI Resume generator. Create a educational qualifications object based on the description provided by the user. keep the language very professional and concise.

    description provided by user : 
    description : ${description}

    Always provide a structured JSON response.
    Response schema :
    {
      isVague: boolean(required, if the description provided is not sufficient)
      isVulgar: boolean(required, if there is vulgarity/voilence/illegal things in the prompt)
      content : object/null (the generated object. show null if isVague or isVulgar is true) : {
        startDate: date string(yyyy-mm-dd) or don't include (job joining date);
        endDate: date string(yyyy-mm-dd) or don't include (job end date);
        current: boolean or don't include (if working here currently);
        description: string or don't include (learnings/experiences at the job between 30 - 80 words in bullet points (-) and seperate lines);
        degree: string or don't include (title of the degree);
        institution: string or don't include (institution that is providing the degree);
        score: string or don't include (score in percentage/gpa/grade);
      }
    }
    Return an Object only.
    and don't ever use null, instead, remove that field from the response
    `;

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(prompt);

    console.log(result.response.text());

    if (!result || !isValidJSON(result.response.text())) {
      return { error: "AI was unable to create response" };
    }
    if (JSON.parse(result.response.text()).isVague) {
      return {
        error: "Please provide relevant information only",
      };
    }
    if (JSON.parse(result.response.text()).isVulgar) {
      return { error: "Please remove vulgarity from the content you provided" };
    }
    console.log(JSON.parse(result.response.text()));
    return { success: JSON.parse(result.response.text()) };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unexpected error occurred",
    };
  }
}

export async function generateSkills(input: GenerateSkillsValues) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthorized");
    }
    const AIAccess = await canUseAI(userId);
    if (!AIAccess) {
      return { error: "Upgrade your plan to Pro to use AI" };
    }

    const { description, type } = GenerateSkillsSchema.parse(input);
    const prompt = `
    You are an AI Resume generator. Create a ${type} skills array based on the description and/or data provided by the user. keep the language very professional and concise.

    description provided by user : 
    description : ${description}

    Always provide a structured JSON response.
    Response schema :
    {
      isVague: boolean(required, if the description provided is not sufficient)
      isVulgar: boolean(required, if there is vulgarity/voilence/illegal things in the prompt)
      content : array/null (the generated array. show null if isVague or isVulgar is true) : object of this array : {
        name: string (name of the skill in 2 - 4 words only eg: DSA in C++ )
        level: number or leave (range from 0 - 4, level of the skill) 
        levelDisabled: boolean (if not showing level, then set this to true);
      }
    }
    Return an array only.
    and don't ever use null, instead, remove that field from the response
    `;

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(prompt);

    console.log(result.response.text());

    if (!result || !isValidJSON(result.response.text())) {
      return { error: "AI was unable to create response" };
    }
    if (JSON.parse(result.response.text()).isVague) {
      return {
        error: "Please provide relevant information only",
      };
    }
    if (JSON.parse(result.response.text()).isVulgar) {
      return { error: "Please remove vulgarity from the content you provided" };
    }
    console.log(JSON.parse(result.response.text()));
    return { success: JSON.parse(result.response.text()) };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unexpected error occurred",
    };
  }
}

export async function generateHobbies(input: GenerateHobbiesValues) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthorized");
    }
    const AIAccess = await canUseAI(userId);
    if (!AIAccess) {
      return { error: "Upgrade your plan to Pro to use AI" };
    }

    const { description } = GenerateHobbiesSchema.parse(input);
    const prompt = `
    You are an AI Resume generator. Create a hobbies array based on the description provided by the user. keep the language very professional and concise.

    description provided by user : 
    description : ${description}

    Always provide a structured JSON response.
    Response schema :
    {
      isVague: boolean(required, if the description provided is not sufficient)
      isVulgar: boolean(required, if there is vulgarity/voilence/illegal things in the prompt)
      content : array/null (the generated array. show null if isVague or isVulgar is true) : object of this array : {
        name: string (name of the skill in 2 - 4 words only eg: DSA in C++ )
        description: string (description of this hobby in under 50 words, in 2 - 5 bullet points(-) and seperate lines).
      }
    }
    Return an array only.
    and don't ever use null, instead, remove that field from the response
    `;

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(prompt);

    console.log(result.response.text());

    if (!result || !isValidJSON(result.response.text())) {
      return { error: "AI was unable to create response" };
    }
    if (JSON.parse(result.response.text()).isVague) {
      return {
        error: "Please provide relevant information only",
      };
    }
    if (JSON.parse(result.response.text()).isVulgar) {
      return { error: "Please remove vulgarity from the content you provided" };
    }
    console.log(JSON.parse(result.response.text()));
    return { success: JSON.parse(result.response.text()) };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unexpected error occurred",
    };
  }
}
