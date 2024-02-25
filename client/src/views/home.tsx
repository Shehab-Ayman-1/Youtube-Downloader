import { useState } from "react";
import { FormSubmitEvent } from "@/types";

import { Buttons, Fields, SubmitButtons, VideoCard } from "@/components/home";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout";

type FormDataProps = {
   type: "video" | "playlist";
   url: string;
   quality: string | undefined;
};

type ResponseProps = {
   title: string;
   url: string;
   duration: string;
   downloadedUrl: string;
   quality: string;
   thumbnail: { url: string; width: string; height: string };
};

export const Home = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios<ResponseProps[]>();
   const [formData, setFormData] = useState<FormDataProps>({ type: "playlist", url: "", quality: "360p" });

   const handleSubmit = async (event: FormSubmitEvent) => {
      event.preventDefault();

      const isPlaylist = formData.url.includes("/playlist?list=");
      const isVideo = formData.url.includes("/watch?v=");

      if (formData.type === "playlist" && !isPlaylist) return alert("Wronge Playlist URL");
      if (formData.type === "video" && !isVideo) return alert("Wronge Video URL");
      if (!formData.url || !formData.quality) return alert("Please Fill All The Required Fields.");

      await refetch("post", formData.type, formData);
   };

   return (
      <section className="container mx-auto p-5">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <h1 className="text-center text-3xl font-extrabold text-teal-500 md:text-4xl">Youtube Downloader</h1>

         <Buttons formData={formData} setFormData={setFormData} />

         <form onSubmit={handleSubmit} className="rounded-lg p-4 shadow-sp shadow-dimWhite">
            <Fields formData={formData} setFormData={setFormData} />
            <SubmitButtons data={data} loading={loading} />
         </form>

         {data?.map(({ title, url, duration, downloadedUrl, quality, thumbnail }, i) => (
            <VideoCard
               title={title}
               url={url}
               downloadedUrl={downloadedUrl}
               duration={duration}
               thumbnail={thumbnail}
               quality={quality}
               key={i}
            />
         ))}
      </section>
   );
};
