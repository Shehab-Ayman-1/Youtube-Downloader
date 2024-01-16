import { Typography as MTTypography } from "@material-tailwind/react";
import { ReactNode } from "react";
import { Color } from "@/types";

type TypographyProps = {
   variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "paragraph" | "lead" | "small";
   className?: string;
   children: ReactNode;
   color?: Color | "black";
};

export const Typography = ({ variant = "h5", className = "", color = "teal", children }: TypographyProps) => {
   return (
      <MTTypography placeholder="typography" variant={variant} color={color} className={className}>
         {children}
      </MTTypography>
   );
};
