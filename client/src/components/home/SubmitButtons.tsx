import { useState } from "react";
import { Button } from "@/components/ui";

type ResponseProps = {
   title: string;
   url: string;
   duration: string;
   downloadedUrl: string;
   thumbnail: { url: string; width: string; height: string };
};

type SubmitButtonsProps = {
   data: ResponseProps[] | undefined;
   loading: boolean;
};

export const SubmitButtons = ({ data, loading }: SubmitButtonsProps) => {
   const [coppied, setCoppied] = useState(false);

   const handleClipboard = async () => {
      if (!data) return;

      const urls = data.map((video) => video.downloadedUrl + "\n\n").join(" ");
      await navigator.clipboard.writeText(urls);

      setCoppied(true);
      setTimeout(() => setCoppied(false), 2000);
   };

   return (
      <div className="flex-center my-5">
         <Button
            type="submit"
            icon="fa-search text-white group-hover:text-white"
            className="mt-5"
            disabled={loading}
         >
            SEARCH
         </Button>
         <Button
            icon={`${coppied ? "fa-check-double !text-xl" : "fa-clipboard"} text-white group-hover:text-white`}
            className={`mt-5 ${!data?.length ? "!hidden" : ""} `}
            onClick={handleClipboard}
         >
            {coppied ? "Coppied" : "Copy"}
         </Button>
      </div>
   );
};
