import React from "react";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";
import EmployeesContent from "../../../components/employees/EmployeesContent";

const Employees = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-main container-fluid">
          <EmployeesContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default Employees;
