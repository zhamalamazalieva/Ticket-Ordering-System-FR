import React from "react";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";
import UsersContent from '../../../components/users/UsersContent';

const Users = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-main container-fluid">
          <UsersContent/>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default Users;