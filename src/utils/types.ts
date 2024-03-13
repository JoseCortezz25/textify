import { ReactNode } from "react";

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