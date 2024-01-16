import { Button as MTButton } from "@material-tailwind/react";
import { Variant, Color, ButtonEvent } from "@/types";
import { ReactNode } from "react";

type ButtonProps = {
   type?: "button" | "submit" | "reset";
   className?: string;
   icon?: string;
   color?: Color | "black";
   variant?: Variant;
   disabled?: boolean;
   fullWidth?: boolean;
   size?: "sm" | "md" | "lg";
   onClick?: (event: ButtonEvent) => any;
   children?: ReactNode;
};

export const Button = ({
   type = "button",
   variant = "gradient",
   color = "teal",
   className = "",
   icon,
   disabled = false,
   fullWidth = false,
   size = "sm",
   children,
   onClick,
}: ButtonProps) => {
   return (
      <MTButton
         type={type}
         variant={variant}
         color={color}
         disabled={disabled}
         fullWidth={fullWidth}
         onClick={onClick}
         placeholder="button"
         size={size}
         className={`flex-center group px-3 text-base hover:brightness-125 md:text-xl ${className}`}
      >
         {icon && <i className={`fa ${icon || ""} text-sm group-hover:text-teal-500 rtl:mt-3`} />}
         {children || " "}
      </MTButton>
   );
};
