import React from "react";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";

const HomePage = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">This is main page</div>
        <TheFooter />
      </div>
    </div>
  );
};

export default HomePage;
