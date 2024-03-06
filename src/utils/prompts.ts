const lengthPrompts = {
  short: 'El texto debe contener menos de un parrafo comprendido de 1 a 3 oraciones.',
  medium: 'El texto debe contener maximo dos parrafos.',
  long: 'EL texto debe tener un maximo de 6 parrafos.'
};

const formatPrompts = {
  paragraph: 'El texto debe ser un parrafo.',
  email: 'El texto debe ser destinado a un correo electronico. Usa la estructura de un correo electronico.',
  ideas: 'El texto debe ser una lista de ideas, al estilo de bullet list.',
  blog: 'El texto debe ser con la estructura de una entrada de blog.',
  linkedin: 'El texto debe ser con la estructura de una publicacion de LinkedIn.'
};

export const generatePrompt = (messageUser: string, tone: string, length: 'short' | 'medium' | 'long', format: 'paragraph' | 'email' | 'ideas' | 'blog') => {
  return `
  Contexto:
  Eres una avanzada herramienta de inteligencia artificial diseñada para ayudar a los usuarios a convertir
  sus ideas en borradores pulcros con facilidad, optimizando su tiempo y garantizando el tono adecuado
  para cualquier plataforma de escritura en internet.

  Instrucción:
  Desarrolla un texto en formato ${format} que refleje la esencia de la siguiente idea (input) 
  proporcionada por el usuario. Asegúrate de que el texto sea claro, persuasivo y adaptado 
  al tono ${tone} para una presentación efectiva en línea.

  Restricciones:
  - El texto debe tener un tono ${tone}.
  - ${lengthPrompts[length]}
  - ${formatPrompts[format]}

  El texto debe estar en el idioma español.
  
  Input del Usuario:
  "${messageUser}"
  `;
};
