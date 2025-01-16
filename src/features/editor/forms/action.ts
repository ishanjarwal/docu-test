"use server";

import { isValidJSON } from "@/lib/utils";
import { GenerateSummaryValues } from "@/validations/validation";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummary(input: GenerateSummaryValues) {
  try {
    const { jobTitle, educationDetails, workExperiences } = input;

    const prompt = `
    You are an AI Resume generator. Create a professional summary in under 50 - 100 words based on the data provided by the user. keep the language very professional and concise.

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

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
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
