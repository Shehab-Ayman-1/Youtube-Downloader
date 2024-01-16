import { Field, Selectbox } from "@/components/ui";
import { FieldEvent } from "@/types";
import { Dispatch } from "react";

type FormDataProps = {
   type: "video" | "playlist";
   url: string;
   quality: string | undefined;
};

type FieldsProps = {
   formData: FormDataProps;
   setFormData: Dispatch<React.SetStateAction<FormDataProps>>;
};

const QUALITIES = ["144p", "270p", "360p", "480p", "720p", "1080p"];
export const Fields = ({ formData, setFormData }: FieldsProps) => {
   const handleChange = (event: FieldEvent) => {
      setFormData((form) => ({ ...form, [event.target.name]: event.target.value }));
   };

   return (
      <div className="">
         <Field
            label={`${formData.type} URL`}
            name="url"
            styles={{ input: "normal-case" }}
            value={formData.url}
            onChange={handleChange}
         />
         <Selectbox
            label={`${formData.type} Quality`}
            options={QUALITIES}
            onChange={(value) => setFormData((form) => ({ ...form, quality: value }))}
         />
      </div>
   );
};
