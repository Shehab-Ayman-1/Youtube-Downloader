import { Color } from "@/types";
import { Card as MTCard, CardHeader as MTCardHeader } from "@material-tailwind/react";
import { CardBody as MTCardBody, CardFooter as MTCardFooter } from "@material-tailwind/react";
import { ReactNode } from "react";

type CardProps = {
   className?: string;
   children: ReactNode;
};

type CardHeaderProps = {
   className?: string;
   color?: Color;
   variant?: "gradient" | "filled";
   children: ReactNode;
};

type CardBodyProps = {
   className?: string;
   children: ReactNode;
};

type CardFooterProps = {
   className?: string;
   children: ReactNode;
};

export const Card = ({ className = "", children }: CardProps) => {
   return (
      <MTCard
         placeholder="card"
         className={`overflow-x-auto bg-transparent p-2 shadow-sp dark:shadow-none ${className}`}
      >
         {children}
      </MTCard>
   );
};

export const CardHeader = ({
   className = "",
   color = "teal",
   variant = "gradient",
   children,
}: CardHeaderProps) => {
   return (
      <MTCardHeader
         placeholder="card-header"
         variant={variant}
         color={color}
         className={`flex-center mx-auto -mt-12 mb-4 h-20 w-[80%] bg-gradient-to-r from-teal-400 to-teal-900 sm:h-28 ${className}`}
      >
         {children}
      </MTCardHeader>
   );
};

export const CardBody = ({ className = "", children }: CardBodyProps) => {
   return (
      <MTCardBody placeholder="card-body" className={`flex flex-col gap-4 p-3 ${className}`}>
         {children}
      </MTCardBody>
   );
};

export const CardFooter = ({ className = "", children }: CardFooterProps) => {
   return (
      <MTCardFooter placeholder="card-footer" className={`p-3 ${className}`}>
         {children}
      </MTCardFooter>
   );
};
