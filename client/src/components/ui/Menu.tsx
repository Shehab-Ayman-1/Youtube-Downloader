import { Menu as MTMenu, MenuItem as MTMenuItem, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { ReactNode } from "react";
import { MenuItemEvent } from "@/types";

type MenuItemProps = {
   className: string;
   children: ReactNode;
   onClick?: (event: MenuItemEvent) => void;
};

export const MenuItem = ({ className = "", onClick, children }: MenuItemProps) => {
   return (
      <MTMenuItem className={className} placeholder="menu-item" onClick={onClick}>
         {children}
      </MTMenuItem>
   );
};

type MenuProps = {
   handler: string | JSX.Element;
   allowHover?: boolean;
   children: ReactNode;
};

export const Menu = ({ handler, allowHover = true, children }: MenuProps) => {
   return (
      <MTMenu allowHover={allowHover}>
         <MenuHandler>
            <Button
               placeholder="toggler"
               variant="text"
               size="sm"
               color="teal"
               className="flex-center group px-3 text-sm hover:brightness-125 md:text-base"
            >
               {handler}
            </Button>
         </MenuHandler>

         <MenuList placeholder="menu-list" className="bg-gradient">
            {children}
         </MenuList>
      </MTMenu>
   );
};
