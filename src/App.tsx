import { FC } from "react";

import Navbar from "./layouts/nav/Navbar";
import Hero from "./hero/Hero";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

export default App;
