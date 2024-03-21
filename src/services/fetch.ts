import { generatePrompt } from "@/utils/prompts";
import { FORMAT, LANGUAGE, LENGTH, TONES } from "@/utils/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const fetchAltFromAI = async (
  initialMessage: string,
  tone: TONES,
  length: LENGTH,
  format: FORMAT,
  language: LANGUAGE
) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(generatePrompt(initialMessage, tone as TONES, length as LENGTH, format as FORMAT, language as LANGUAGE));
    const response = await result.response;
    const text = response.text();

    return text as string;

  } catch (error) {
    console.error(error);
  }
};

export {
  fetchAltFromAI
};