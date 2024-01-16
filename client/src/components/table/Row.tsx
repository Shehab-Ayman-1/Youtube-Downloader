import { ReactNode } from "react";

type RowProps = {
   className?: string;
   index: number;
   children: ReactNode;
};

export const Row = ({ className = "", index, children, ...rest }: RowProps) => {
   const colorByModelus = index % 2 ? "bg-gradient-to-r from-dimTeal to-teal-100 dark:to-dimTeal" : "";
   const printStyle = "print:border-0 print:border-b print:border-solid print:border-b-teal-200";

   return (
      <tr className={`p-2 md:p-4 ${printStyle} ${colorByModelus} ${className}`} {...rest}>
         {children}
      </tr>
   );
};
