import { Input } from "@material-tailwind/react";
import { FieldEvent } from "@/types";

type Styles = {
   input?: string;
   container?: string;
   label?: string;
};

type FieldProps = {
   type?: "text" | "email" | "password" | "number" | "date" | "month";
   label: string;
   name: string;
   value?: string;
   min?: string | number;
   required?: boolean;
   onChange?: (event: FieldEvent) => any;
   styles?: Styles;
};

const styleClasses = {
   input: "font-serif !text-xl caret-teal-500 placeholder:text-dimWhite disabled:bg-transparent md:!text-xl dark:text-white/80",
   container: "h-14 md:h-20 border-b-sp mt-4 !border-teal-300",
   label: "text-xl peer-focus:text-xl -top-4 md:-top-1.5 peer-disabled:!text-dimWhite peer-placeholder-shown:text-xl",
};

export const Field = ({
   type = "text",
   label,
   name,
   value,
   min = "0",
   required = true,
   onChange,
   styles = { input: "", container: "", label: "" },
}: FieldProps) => {
   return (
      <Input
         type={type}
         label={label}
         name={name}
         value={value}
         required={required}
         onChange={onChange}
         min={min}
         variant="standard"
         size="lg"
         color="teal"
         crossOrigin="anonymous"
         className={`${styleClasses.input} ${styles.input}`}
         containerProps={{ className: `${styleClasses.container} ${styles.container}` }}
         labelProps={{ className: `${styleClasses.label} ${styles.label}` }}
      />
   );
};
