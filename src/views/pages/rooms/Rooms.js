import React from "react";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";
import RoomsContent from '../../../components/rooms/RoomsContent';
const Rooms = () => {
    return(
        <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-main container-fluid">
            <RoomsContent/>
        </div>
          <TheFooter />
        </div>
      </div>
    );
};
export default Rooms;
