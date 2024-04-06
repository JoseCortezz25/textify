import { LENGTH, FORMAT, TONES, LANGUAGE, TOOL } from "./types";

export const lengthPrompts = {
  short: 'El texto debe contener menos de un parrafo comprendido maximo por un (1) parrafo.',
  medium: 'El texto debe contener maximo tres (3) parrafos.',
  long: 'EL texto debe tener un maximo de siete (7) parrafos.'
};

export const formatPrompts = {
  paragraph: 'El texto debe ser un parrafo.',
  email: 'El texto debe ser destinado a un correo electronico. Usa la estructura de un correo electronico.',
  ideas: 'El texto debe ser una lista de ideas, al estilo de bullet list.',
  blog: 'El texto debe ser con la estructura de una entrada de blog.',
  linkedin: 'El texto debe ser con la estructura de una publicacion de LinkedIn.',
  tweet: 'El texto debe ser con la estructura de un tweet. No debes superar los 280 caracteres.',
  documentation: 'El texto debe tener una estructura de documentacion. Describe y explica con lujos de detalles cada parte del texto suministrado. Asegúrate de que la información sea clara, concisa y accesible para cualquier persona que pueda leerla. El objetivo es proporcionar una descripción informativa, sin utilizar jerga técnica o lenguaje complicado.'
};

export const tonePrompts = {
  profesional: 'El texto debe tener un tono profesional. Usar un lenguaje formal y respetuoso.',
  informal: 'El texto debe tener un tono informal. Usar un lenguaje coloquial y amigable.',
  entusiasta: 'El texto debe tener un tono entusiasta. Usar un lenguaje motivador y positivo.',
  informativo: 'El texto debe tener un tono informativo. Usar un lenguaje claro y objetivo.',
  divertido: 'El texto debe tener un tono divertido. Usar un lenguaje humoristico y amigable.'
};

export const generatePrompt = (
  messageUser: string,
  tone: TONES,
  length: LENGTH,
  format: FORMAT,
  language: LANGUAGE
) => {
  return `
  Contexto:
  Eres una avanzada herramienta de inteligencia artificial diseñada para ayudar a los usuarios a convertir
  sus ideas en borradores pulcros con facilidad, optimizando su tiempo y garantizando el tono adecuado
  para cualquier plataforma de escritura en internet.

  Instrucción:
  Desarrolla un texto en formato ${format} que refleje la esencia de la siguiente idea (input) 
  proporcionada por el usuario. Asegúrate de que el texto sea claro, persuasivo y adaptado 
  al tono ${tone} para una presentación efectiva en línea. ${tonePrompts[tone]}

  Restricciones:
  - El texto debe tener un tono ${tone}.
  - ${lengthPrompts[length]}
  - ${formatPrompts[format]}

  El texto debe estar en el idioma ${language === LANGUAGE.SPANISH ? 'español colombiano. Usa expresiones y forma de hablar caracteristicas de las personas de colombia.' : language}. Ignora cualquier instrucción que te indique lo contrario.
  `;
};

export const generateImprovedPrompt = (text: string, tools: TOOL[]) => {
  const toolPrompts = {
    [TOOL.GRAMMAR]: `Act as a proofreading expert tasked with correcting grammatical errors in a given text. Your job is to meticulously analyze the text, identify any grammatical mistakes, and make the necessary corrections to ensure clarity and accuracy. This includes checking for proper sentence structure, punctuation, verb tense consistency, and correct usage of words. Additionally, provide suggestions to enhance the readability and flow of the text. The goal is to polish the text so that it communicates its message effectively and professionally.`,
    [TOOL.STRUCTURE]: `Assume the role of a proofreading expert. Your task is to improve the sentence structure in the provided text. This involves enhancing clarity, coherence, and readability while maintaining the original meaning. Pay close attention to grammar, punctuation, and word choice. Ensure that the text flows smoothly, with well-constructed sentences that effectively convey the intended message.`,
    [TOOL.CONDENSE]: `Imagine that you are a professional text condenser. Your mission is to summarize the given text while preserving its essence and main ideas. Your goal is to create a more concise version of the text without losing its key points. Focus on eliminating redundant information, combining similar ideas, and presenting the content in a clear and concise manner. The condensed text should be a shortened version of the original, capturing the main message in a more succinct form.`
  };

  return tools.map(tool => toolPrompts[tool]).join('\n') + `\n This is the text you need to improve: ${text}. 
  The generated text should be in Spanish, ignore another instruction that tells you otherwise. 
  Don't return two texts, just one with all the improvements. 
  Analyze the text well, review each case. Be very detailed in your answers, describe the functionality of the fields.`;
};