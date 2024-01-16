import { Button, Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useLayoutEffect, useState } from "react";

export const Configrator = () => {
   const [open, setOpen] = useState(false);

   useLayoutEffect(() => {
      const mode = localStorage.getItem("mode") || "light";
      const theme = localStorage.getItem("theme") || "teal";

      document.querySelector("html")?.setAttribute("data-theme", theme);
      document.querySelector("html")?.setAttribute("class", mode);
   }, []);

   const openDrawer = () => {
      setOpen(true);
   };

   const closeDrawer = () => {
      setOpen(false);
   };

   const handleChangeMode = (mode: string) => {
      document.querySelector("html")?.setAttribute("class", mode);
      localStorage.setItem("mode", mode);
      setOpen(false);
   };

   const handleChangeTheme = (theme: string) => {
      document.querySelector("html")?.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      setOpen(false);
   };

   const colors = [
      { theme: "red", from: "from-red-400", to: "to-red-900", hover: "hover:bg-red-900/50" },
      { theme: "pink", from: "from-pink-400", to: "to-pink-900", hover: "hover:bg-pink-900/50" },
      { theme: "orange", from: "from-orange-400", to: "to-orange-900", hover: "hover:bg-orange-900/50" },
      {
         theme: "deep-orange",
         from: "from-deep-orange-400",
         to: "to-deep-orange-900",
         hover: "hover:bg-deep-orange-900/50",
      },
      { theme: "indigo", from: "from-indigo-400", to: "to-indigo-900", hover: "hover:bg-indigo-900/50" },
      { theme: "blue", from: "from-blue-400", to: "to-blue-900", hover: "hover:bg-blue-900/50" },
      { theme: "teal", from: "from-purple-400", to: "to-purple-900", hover: "hover:bg-purple-900/50" },
      { theme: "teal", from: "from-green-400", to: "to-green-900", hover: "hover:bg-green-900/50" },
   ];

   return (
      <div className="fixed z-[1003]">
         <IconButton
            color="teal"
            variant="gradient"
            size="lg"
            placeholder="configrator"
            className={`group !fixed bottom-5 right-5 rounded-full shadow-md hover:scale-125 print:hidden md:bottom-10 md:right-10`}
            onClick={openDrawer}
         >
            <i className="fa fa-gear fa-spin text-2xl text-white group-hover:text-white" />
         </IconButton>

         <Drawer
            placement="left"
            placeholder="Drawer"
            open={open}
            className="bg-gradient flex-between fixed flex-col overflow-y-auto p-5"
            onClose={closeDrawer}
         >
            <div className="head">
               <Typography placeholder="title" variant="h3" className="text-black dark:text-white">
                  Settings
               </Typography>
            </div>

            <div className="properties mt-8 w-full">
               <Typography placeholder="properties" variant="h3" color="teal" className="text-2xl leading-normal">
                  Screen Properties
               </Typography>
               <div className="">
                  <Typography placeholder="width" className="mb-2 text-base leading-normal text-dimWhite">
                     Width: {screen.availWidth} px
                  </Typography>
                  <Typography placeholder="height" className="mb-2 text-base leading-normal text-dimWhite">
                     Height: {screen.availHeight} px
                  </Typography>
               </div>
            </div>

            <div className="colors mt-8">
               <Typography placeholder="theme" variant="h3" color="teal" className="text-2xl leading-normal">
                  Display Theme
               </Typography>
               <Typography placeholder="color" className="mb-2 text-base leading-normal text-dimWhite">
                  You Can Choose Your Prefered Theme From This Material Colors
               </Typography>
               <div className="flex-between flex-wrap">
                  {colors.map(({ theme, from, to, hover }, i) => (
                     <Button
                        key={i}
                        variant="text"
                        color="teal"
                        placeholder="color"
                        onClick={() => handleChangeTheme(theme)}
                        className={`group px-3 hover:scale-125 ${hover}`}
                     >
                        <div
                           className={`h-6 w-6 cursor-pointer rounded-full border border-solid border-black bg-gradient-to-br group-hover:scale-125 group-hover:brightness-125 ltr:h-7 ltr:w-7 ${from} ${to}`}
                        />
                     </Button>
                  ))}
               </div>
            </div>

            <div className="mode mt-8">
               <Typography placeholder="mode" variant="h3" color="teal" className="text-2xl leading-normal">
                  Display Mode
               </Typography>
               <Typography placeholder="mode" className="mb-2 text-base leading-normal text-dimWhite">
                  You Can Choose Your Prefered Mode From This Material Colors
               </Typography>
               <div className="flex-between">
                  <Button
                     size="lg"
                     variant="gradient"
                     placeholder="dark-mode"
                     className="hover:brightness-125 ltr:text-base"
                     onClick={() => handleChangeMode("dark")}
                  >
                     Dark Mode
                  </Button>
                  <Button
                     size="lg"
                     variant="outlined"
                     placeholder="light-mode"
                     color="teal"
                     className="border-solid hover:brightness-125 ltr:text-base"
                     onClick={() => handleChangeMode("light")}
                  >
                     Light Mode
                  </Button>
               </div>
            </div>
         </Drawer>
      </div>
   );
};
