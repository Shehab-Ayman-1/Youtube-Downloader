import { Fragment } from "react";

import { Configrator } from "@/layout";
import { Home } from "@/views";

export const Wrapper = () => {
   return (
      <Fragment>
         {/* Home Background */}

         {/* Configrator */}
         <Configrator />

         {/* Navbar */}
         <Home />
      </Fragment>
   );
};
