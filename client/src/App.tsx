import { Routes, Route } from "react-router-dom";

import { PageNotFound, Wrapper } from "@/layout";

const App = () => {
   return (
      <Routes>
         <Route path="*" element={<PageNotFound />} />
         <Route path="/" element={<Wrapper />} />
      </Routes>
   );
};

export default App;
