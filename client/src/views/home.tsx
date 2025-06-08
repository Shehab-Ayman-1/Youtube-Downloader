import { useState } from "react";
import { FormSubmitEvent } from "@/types";

import { Buttons, Fields, SubmitButtons, VideoCard } from "@/components/home";
import { useAxios } from "@/hooks/useAxios";
import { routes } from "@/constants";
import { Loading } from "@/layout";

type FormDataProps = {
   quality: string | undefined;
   type: "video" | "playlist";
   url: string;
};

export type ResponseProps = {
   thumbnail: { url: string; width: string; height: string };
   downloadedUrl: string;
   duration: string;
   quality: string;
   title: string;
   url: string;
};

export const Home = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios<ResponseProps[]>();
   const [formData, setFormData] = useState<FormDataProps>({ type: "playlist", url: "", quality: "360p" });

   const getDownloadURL = (url: string, quality: string) => {
      const baseURL = routes.locale.baseURL;
      const encodedURL = encodeURIComponent(url);
      return `${baseURL}/stream?url=${encodedURL}&quality=${quality}`;
   };

   const onSubmit = async (event: FormSubmitEvent) => {
      event.preventDefault();

      const isPlaylist = formData.type === "playlist" && formData.url.includes("/playlist?list=");
      const isVideo = formData.type === "video" && formData.url.includes("/watch?v=");

      if (!formData.url || !formData.quality) return alert("Please Fill All The Required Fields.");
      if (!isPlaylist && !isVideo) return alert(`Wronge ${formData.type} URL`);

      await refetch("post", formData.type, formData, undefined, true);
   };

   return (
      <section className="container mx-auto p-5">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <h1 className="text-center text-3xl font-extrabold text-teal-500 md:text-4xl">Youtube Downloader</h1>
         <Buttons formData={formData} setFormData={setFormData} />

         <form onSubmit={onSubmit} className="rounded-lg p-4 shadow-sp shadow-dimWhite">
            <Fields formData={formData} setFormData={setFormData} />
            <SubmitButtons data={data} loading={loading} getDownloadURL={getDownloadURL} />
         </form>

         {data?.map(({ title, url, duration, quality, thumbnail }, i) => (
            <VideoCard
               downloadedUrl={url ? getDownloadURL(url, quality) : null}
               thumbnail={thumbnail}
               duration={duration}
               quality={quality}
               title={title}
               url={url}
               key={i}
            />
         ))}
      </section>
   );
};
