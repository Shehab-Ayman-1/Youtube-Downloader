import { Tabs as MTTabs, Tab, TabsBody, TabsHeader } from "@material-tailwind/react";
import { ReactNode } from "react";

type headerProps = {
   name: string;
   value: string;
   reset: (arg?: any) => any;
};
type TabsProps = {
   defaultValue: string;
   headers: headerProps[];
   children: ReactNode;
};

export const Tabs = ({ defaultValue = "", headers = [], children }: TabsProps) => {
   return (
      <MTTabs value={defaultValue}>
         <TabsHeader
            placeholder="tab-header"
            className="border border-solid border-teal-500 bg-teal-100 dark:bg-transparent"
            indicatorProps={{ className: "bg-gradient-to-b from-teal-400 to-teal-800" }}
         >
            {headers.map(({ name, value, reset }: headerProps) => (
               <Tab
                  value={value}
                  placeholder="tab-name"
                  className="py-0 text-base font-semibold text-white md:py-1 md:text-xl"
                  onClick={reset}
                  key={name}
               >
                  {name}
               </Tab>
            ))}
         </TabsHeader>

         <TabsBody placeholder="tab-body">{children}</TabsBody>
      </MTTabs>
   );
};
