import { ReactNode } from "react";
import { Typography } from "@/components/ui";
import { Color } from "@/types";

type PageHeadProps = {
   variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "paragraph" | "lead" | "small";
   color?: Color;
   className?: string;
   children: ReactNode;
};

export const PageHead = ({ variant = "h3", color = "teal", className = "", children = "" }: PageHeadProps) => {
   return (
      <Typography variant={variant} color={color} className={`mb-4 text-center ${className}`}>
         {children}
      </Typography>
   );
};
