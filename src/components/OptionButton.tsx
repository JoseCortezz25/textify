import { OptionButtonProps } from "@/utils/types";
import { cn } from "@/utils/utils";

export const OptionButton = ({ label, onClick, selected, children, ...props }: OptionButtonProps) => {
  return (
    <button className={cn('option-card', selected && 'selected-option')} onClick={onClick} {...props}>
      <div className="option-card__image">
        {children}
      </div>
      <p className="option-card__label">{label}</p>
    </button>
  );
};
