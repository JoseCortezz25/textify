import { Part } from "@google/generative-ai";
import { ReactNode } from "react";

export enum TONE_DOCS {
  CASUAL = "CASUAL",
  OBJETIVE = "OBJETIVE",
  FORMAL = "FORMAL"
}

export enum TONES {
  PROFESSIONAL = "profesional",
  INFORMAL = "informal",
  ENTHUSIASTIC = "entusiasta",
  INFORMATIVE = "informativo",
  FUNNY = "divertido",
}

export enum FORMAT {
  PARAGRAPH = "paragraph",
  EMAIL = "email",
  IDEAS = "ideas",
  BLOG = "blog",
  TWEET = "tweet",
  DOCUMENTATION = "documentation"
};

export enum LENGTH {
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long"
};

export enum LANGUAGE {
  SPANISH = "ES",
  ENGLISH = "EN",
  PORTUGUESE = "PT"
};

export interface OptionButtonProps {
  label: string;
  onClick?: () => void;
  selected: boolean;
  children: ReactNode;
}

export interface LanguageOptionProps {
  label: string;
  onClick?: () => void;
  selected: boolean;
  icon: string;
}

export interface TypographyProps {
  as?: string;
  children?: ReactNode;
}

export type ResponseAI = {
  message: {
    candidates: CandidateResponse[];
  };
};

type CandidateResponse = {
  content: {
    parts: PartResponse[];
    role: string;
  };
  finishReason: string;
  index: number;
  safetyRatings: SafetyRating[];
};

type PartResponse = {
  text: string;
};

type SafetyRating = {
  category: string;
  probability: string;
};

export type GenericPart = {
  text: string;
}[]

export enum TOOL {
  GRAMMAR = 'grammatical',
  STRUCTURE = 'structure',
  CONDENSE = 'condense'
}