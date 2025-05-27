import { useState } from "react";

import { Button } from "@/components/ui";
import { ResponseProps } from "@/views";
import { routes } from "@/constants";

type SubmitButtonsProps = {
   data?: ResponseProps[];
   loading: boolean;
};

export const SubmitButtons = ({ data, loading }: SubmitButtonsProps) => {
   const [coppied, setCoppied] = useState(false);

   const onCopy = async () => {
      if (!data) return;

      const baseURL = routes.locale.baseURL;
      console.log(data);

      const urls = data
         .map((video) => {
            const url = `${baseURL}/stream?url=${encodeURIComponent(video.url)}&quality=${video.quality}`;
            // eslint-disable-next-line no-useless-escape
            const name = video.title.replace(/[\/\\:*?"<>|]/g, "");
            return `${url}\noutput: ${name}.mp4\n`;
         })
         .join("\n");
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
            onClick={onCopy}
         >
            {coppied ? "Coppied" : "Copy"}
         </Button>
      </div>
   );
};
