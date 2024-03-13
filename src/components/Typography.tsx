import { TypographyProps } from "@/utils/types";

export const Typography = ({ as = 'div', children }: TypographyProps) => {
  const Element = as as keyof JSX.IntrinsicElements;

  return (
    <Element className="typography">
      {children}
    </Element>
  );
};