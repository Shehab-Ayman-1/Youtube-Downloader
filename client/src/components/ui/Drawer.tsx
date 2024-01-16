import { Drawer as MTDrawer } from "@material-tailwind/react";
import { ReactNode } from "react";

type DrawerProps = {
   placement?: "top" | "right" | "bottom" | "left";
   open: boolean;
   className?: string;
   onClose: () => any;
   children: ReactNode;
};

export const Drawer = ({ placement = "left", open = false, className = "", onClose, children }: DrawerProps) => {
   return (
      <MTDrawer
         placement={placement}
         placeholder="Drawer"
         open={open}
         className={`bg-gradient flex-between fixed flex-col overflow-y-auto p-5 ${className}`}
         onClose={onClose}
      >
         {children}
      </MTDrawer>
   );
};
