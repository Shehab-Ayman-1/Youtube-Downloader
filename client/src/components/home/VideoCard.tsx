import { Typography } from "../ui";

type VideoCardProps = {
   title: string;
   url: string;
   duration: string;
   thumbnail: { url: string; width: string; height: string };
};

export const VideoCard = ({ title, url, duration, thumbnail }: VideoCardProps) => {
   return (
      <div className="bg-gradient my-10 flex !items-start gap-5 rounded-md shadow-md shadow-dimWhite">
         <div className="relative">
            <img
               src={thumbnail.url}
               alt="img"
               className="rounded-md"
               style={{ width: thumbnail.width, height: thumbnail.height }}
            />
            <Typography className="absolute bottom-1 right-1 rounded-sm bg-black text-white">
               {duration}
            </Typography>
         </div>

         <div className="">
            <Typography>{title}</Typography>
            <Typography className="text-sm text-dimWhite">{url}</Typography>
         </div>
      </div>
   );
};
