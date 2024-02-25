import { Button, Typography } from "../ui";

type VideoCardProps = {
   title: string;
   url: string;
   duration: string;
   quality: string;
   downloadedUrl: string;
   thumbnail: { url: string; width: string; height: string };
};

export const VideoCard = ({ title, url, duration, quality, downloadedUrl, thumbnail }: VideoCardProps) => {
   return (
      <div className="flex-between bg-gradient my-10 flex-col rounded-md p-2 shadow-md shadow-dimWhite md:flex-row">
         <div className="flex w-full flex-col items-start md:flex-row">
            <div className="relative mr-3 h-full">
               <img
                  src={thumbnail.url}
                  alt="img"
                  className="rounded-md"
                  style={{ width: thumbnail.width, height: thumbnail.height }}
               />
               <Typography className="absolute left-1 top-1 rounded-sm bg-black px-1 pb-1 text-base leading-none text-white">
                  {quality}
               </Typography>
               <Typography className="absolute bottom-1 right-1 rounded-sm bg-black px-1 pb-1.5 text-base text-white">
                  {duration}
               </Typography>
            </div>

            <div className="w-full overflow-x-hidden">
               <Typography>{title}</Typography>
               <Typography className="my-3">{quality}</Typography>
               <Typography className="w-fit text-sm text-dimWhite hover:text-black dark:hover:text-white">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                     {url}
                  </a>
               </Typography>
            </div>
         </div>

         <Button icon="fa-download text-white group-hover:text-white">
            <a href={downloadedUrl} className="h-full w-full" target="_blank" download rel="noopener noreferrer">
               Download
            </a>
         </Button>
      </div>
   );
};
