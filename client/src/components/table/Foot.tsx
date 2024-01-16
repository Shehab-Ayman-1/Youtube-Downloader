import { Typography } from "@material-tailwind/react";

type FootProps = {
   total: number;
   footerTitle?: string;
   footerSpan: [number, number];
};

export const Foot = ({ total, footerTitle, footerSpan: [colSpan1, colSpan2] }: FootProps) => {
   return (
      <tfoot>
         <tr className="border-t-sp bg-gradient-to-br from-teal-300 to-teal-900 text-center">
            <th colSpan={colSpan1} className="p-2 md:p-4">
               <Typography
                  placeholder="footer-title"
                  variant="h5"
                  className="text-base text-white print:text-dimWhite md:text-xl"
               >
                  {footerTitle || "Total Costs"}
               </Typography>
            </th>
            <th colSpan={colSpan2} className="p-2 text-center md:p-4">
               <Typography
                  placeholder="footer-value"
                  variant="h5"
                  color="teal"
                  className="text-base text-white print:text-dimWhite md:text-xl"
               >
                  {total?.toLocaleString() || "00,00"} <span className="text-lg">Pound</span>
               </Typography>
            </th>
         </tr>
      </tfoot>
   );
};
