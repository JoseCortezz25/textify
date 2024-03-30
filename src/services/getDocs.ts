import { generateParts } from "@/utils/data";
import { generateImprovedPrompt } from "@/utils/prompts";
import { TONE_DOCS, TOOL } from "@/utils/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const getGeneratedDocs = async (tone: TONE_DOCS, initialText: string, tools: TOOL[]) => {
  let generatedText;
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 4048
  };

  const parts: any = generateParts(tone, initialText);

  const result = await model.generateContent({
    contents: [{
      role: "user",
      parts
    }],
    generationConfig
  });

  const response = result.response;
  generatedText = response.text();

  if (tools.length === 0) return generatedText;
  const prompt = generateImprovedPrompt(generatedText, tools);

  const improvedResult = await model.generateContent(prompt);

  const improvedResponse = improvedResult.response;
  generatedText = improvedResponse.text();
  return generatedText;
};

export {
  getGeneratedDocs
};