import { Button } from "@/components/ui";
import { Dispatch } from "react";

type FormDataProps = {
   type: "video" | "playlist";
   url: string;
   quality: string | undefined;
};

type ButtonsProps = {
   formData: FormDataProps;
   setFormData: Dispatch<React.SetStateAction<FormDataProps>>;
};

export const Buttons = ({ formData, setFormData }: ButtonsProps) => {
   return (
      <div className="flex-center my-10">
         <Button
            fullWidth
            variant={formData.type === "video" ? "gradient" : "outlined"}
            color={formData.type === "video" ? "teal" : "black"}
            className={
               formData.type === "video" ? "" : "border-sp !border-black dark:!border-dimWhite dark:text-dimWhite"
            }
            onClick={() => setFormData((form: FormDataProps) => ({ ...form, type: "video" }))}
         >
            Videos
         </Button>
         <Button
            fullWidth
            variant={formData.type === "playlist" ? "gradient" : "outlined"}
            color={formData.type === "playlist" ? "teal" : "black"}
            className={
               formData.type === "playlist"
                  ? ""
                  : "border-sp !border-black dark:!border-dimWhite dark:text-dimWhite"
            }
            onClick={() => setFormData((form: FormDataProps) => ({ ...form, type: "playlist" }))}
         >
            Playlists
         </Button>
      </div>
   );
};
