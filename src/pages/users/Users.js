import React from "react";
import { TheFooter, TheHeader, TheSidebar } from "../../containers";
import UsersContent from '../../components/users/UsersContent';

const Users = () => {
  return (
        <div className="c-main container-fluid">
          <UsersContent/>
        </div>
  );
};
export default Users;