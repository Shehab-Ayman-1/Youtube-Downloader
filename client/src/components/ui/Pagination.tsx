import { IconButton } from "@material-tailwind/react";
import { Button } from "@/components/ui";

type PaginationProps = {
   activePage: number;
   pagination: number;
   setActivePage: (arg: number) => any;
};

export const Pagination = ({ activePage, setActivePage, pagination }: PaginationProps) => {
   const next = () => {
      if (activePage === pagination) return;
      setActivePage(activePage + 1);
   };

   const prev = () => {
      if (activePage === 0) return;
      setActivePage(activePage - 1);
   };

   return (
      <div className="flex-center my-5 flex-wrap">
         <Button
            variant="text"
            icon="fa-arrow-left text-teal"
            className="p-0 hover:bg-blue-gray-400/20 ltr:text-base"
            onClick={prev}
            disabled={activePage === 0}
         >
            <span className="hidden pb-3 md:inline ltr:pb-1">Prev</span>
         </Button>

         <div className="flex-center flex-wrap">
            {Array(pagination > 10 ? 10 : pagination)
               .fill(1)
               .map((_, index) => (
                  <IconButton
                     color="teal"
                     className="h-8 w-8 text-xl font-bold hover:bg-blue-gray-400/20 hover:brightness-125"
                     variant={activePage === index ? "gradient" : "text"}
                     placeholder="number"
                     key={index}
                     onClick={() => setActivePage(index)}
                  >
                     <span className="block md:-mt-2">{index + 1}</span>
                  </IconButton>
               ))}

            <IconButton
               variant="text"
               color="teal"
               placeholder="more"
               className={`h-8 w-8 text-xl font-bold ${pagination > 10 ? "" : "hidden"}`}
            >
               <span className="-mt-2 block whitespace-nowrap">- - - -</span>
            </IconButton>
         </div>

         <Button
            variant="text"
            icon="fa-arrow-right text-teal"
            className="p-0 hover:bg-blue-gray-400/20 ltr:text-base"
            onClick={next}
            disabled={activePage === pagination - 1}
         >
            <span className="hidden pb-3 md:inline ltr:pb-1">Next</span>
         </Button>
      </div>
   );
};
