import { Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

type ColProps = {
   className?: string;
   style?: string;
   children: ReactNode;
};

export const Col = ({ className = "", style = "", children, ...rest }: ColProps) => {
   return (
      <th className={`p-2 md:p-4 ${className}`} {...rest}>
         <Typography
            placeholder="typography"
            variant="h5"
            className={`whitespace-nowrap text-center text-base font-bold md:text-xl ${style}`}
         >
            {children || " "}
         </Typography>
      </th>
   );
};
