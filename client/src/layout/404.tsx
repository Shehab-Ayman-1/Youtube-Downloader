import { Typography } from "@/components/ui";
import { NotFoundCover } from "@/assets";

export const PageNotFound = () => {
   return (
      <div className="fixed-center">
         <img src={NotFoundCover} alt="404 page" className="mx-auto block h-full w-full object-contain" />
         <Typography variant="h3" className="mt-5 text-center">
            Page Not Found
         </Typography>
      </div>
   );
};
