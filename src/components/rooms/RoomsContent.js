import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import RoomsTable from "./RoomsTable";

function RoomsContent(props) {
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>Управление номерами</CCol>
            <CCol>
              <CButton color="primary" className="float-right">
                <span className="mr-3">Добавить номер</span>
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <RoomsTable />
        </CCardBody>
      </CCard>
    </>
  );
}

export default RoomsContent;
