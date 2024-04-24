import { generateParts } from "@/utils/data";
import { generateCopyPrompt, generateImprovedPrompt } from "@/utils/prompts";
import { FORMAT, TONES, TONE_DOCS, TOOL } from "@/utils/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string);


const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 4048
};

const getGeneratedDocs = async (
  tone: TONE_DOCS,
  initialText: string,
  tools: TOOL[],
  userInstructions: string
) => {
  let generatedText;

  const parts: any = generateParts(tone, initialText, userInstructions);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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

const generateNewVersion = async (
  tone: TONE_DOCS,
  initialGeneratedText: string,
  tools: TOOL[],
  userInstructions: string
) => {
  let generatedText;

  // generate new version based on generated text and tones
  const parts: any = generateParts(tone, initialGeneratedText, userInstructions);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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

const generateCopy = async (
  userInstructions: string,
  objetive: string,
  targetAudience: string,
  tone: TONES,
  format: FORMAT,
  maxTokens?: number
) => {
  try {
    let generatedText;

    const prompt = generateCopyPrompt(userInstructions, objetive, targetAudience, tone, format);
    const generationConfig = {
      maxOutputTokens: maxTokens || 4048,
    };
    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });
    const result = await model.generateContent([prompt]);

    const response = result.response;
    generatedText = response.text();

    return generatedText;
  } catch (error) {
    console.error('Error generating copy', error);
    throw new Error('Error generating copy');
  }
};

export {
  generateCopy,
  getGeneratedDocs,
  generateNewVersion
};