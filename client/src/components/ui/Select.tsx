import { Option, Select } from "@material-tailwind/react";

type Styles = {
   select?: string;
   container?: string;
   label?: string;
   menu?: string;
};

type SelectboxProps = {
   label: string;
   loading?: boolean;
   options: string[];
   styles?: Styles;
   onChange?: (value: string | undefined) => any;
};

const styleClasses = {
   select: "select-box w-full text-base caret-teal-500 md:text-xl dark:text-white/80",
   container: "h-14 md:h-20 border-b-sp mt-4 !border-teal-300",
   label: "text-xl peer-focus:text-xl -top-4 md:-top-1.5 peer-placeholder-shown:text-xl",
   menu: "bg-gradient py-3",
};

export const Selectbox = ({
   label = "",
   loading = false,
   options = [],
   onChange,
   styles = { select: "", container: "", label: "", menu: "" },
}: SelectboxProps) => {
   return (
      <Select
         label={label}
         onChange={onChange}
         placeholder="selectbox"
         variant="standard"
         color="teal"
         size="lg"
         className={`${styleClasses.select} ${styles.select}`}
         containerProps={{ className: `${styleClasses.container} ${styles.container}` }}
         labelProps={{ className: `${styleClasses.label} ${styles.label}` }}
         menuProps={{ className: `${styleClasses.menu} ${styles.menu} overflow-y-auto` }}
         animate={{ initial: { y: 25 }, mount: { y: 0 }, unmount: { y: 25 } }}
      >
         {options.length ? (
            options.map((value, i) => (
               <Option className="text-xl hover:!bg-dimTeal hover:dark:text-white" value={value} key={i}>
                  {value}
               </Option>
            ))
         ) : loading ? (
            <Option className="text-xl" value="">
               Loading...
            </Option>
         ) : (
            <Option className="text-xl" value="">
               No Search Result Was Found 🤷‍♂️
            </Option>
         )}
      </Select>
   );
};
