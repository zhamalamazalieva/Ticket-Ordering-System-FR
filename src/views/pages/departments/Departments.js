import React from "react";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";
import DepartmentContent from "../../../components/department/DepartmentContent";

const Departments = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-main container-fluid">
          <DepartmentContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default Departments;
