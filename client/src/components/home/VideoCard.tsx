import { Button, Typography } from "../ui";

type VideoCardProps = {
   title: string;
   url: string;
   duration: string;
   quality: string;
   downloadedUrl: string | null;
   thumbnail: { url: string; width: string; height: string };
};

export const VideoCard = ({ title, url, duration, quality, downloadedUrl, thumbnail }: VideoCardProps) => {
   return (
      <div className="flex-between bg-gradient my-10 flex-col rounded-md p-2 shadow-md shadow-dimWhite md:flex-row">
         <div className="flex w-full flex-col items-center md:flex-row md:items-start">
            <div className="relative my-auto mr-3 h-full">
               <img
                  src={thumbnail?.url}
                  alt="img"
                  className="max-h-[138px] max-w-[246px] rounded-md "
                  style={{ width: thumbnail?.width, height: thumbnail?.height }}
               />
               <Typography className="absolute left-1 top-1 rounded-sm bg-black px-1 pb-1 text-base leading-none text-white">
                  {quality}
               </Typography>
               <Typography className="absolute bottom-1 right-1 rounded-sm bg-black px-1 pb-1.5 text-base lowercase text-white">
                  {duration}
               </Typography>
            </div>

            <div className="w-full overflow-x-hidden">
               <Typography className="text-center text-base md:text-start md:text-xl">{title}</Typography>
               <Typography className="my-1 text-center text-base text-gray-500 md:my-3 md:text-start md:text-xl">
                  {quality}
               </Typography>
               <Typography className="w-fit text-center text-sm text-dimWhite hover:text-black md:text-start dark:hover:text-white">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                     {url}
                  </a>
               </Typography>
            </div>
         </div>

         {downloadedUrl && (
            <a href={downloadedUrl} rel="noopener noreferrer" target="_blank" download>
               <Button icon="fa-download text-white group-hover:text-white">Download</Button>
            </a>
         )}
      </div>
   );
};
