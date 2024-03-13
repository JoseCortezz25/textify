import { LanguageOptionProps } from "@/utils/types";
import { cn } from "@/utils/utils";
import Image from "next/image";

export const LanguageOption = ({ label, onClick, icon, selected }: LanguageOptionProps) => {
  return (
    <button className={cn('button-language', selected && 'selected-language')} onClick={onClick}>
      <Image src={icon} alt="Language Icon" width={20} height={20} />
      <p className="button-language__label">{label}</p>
    </button>
  );
};
