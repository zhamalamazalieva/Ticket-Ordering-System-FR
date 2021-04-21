import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import RoomsTable from "./RoomsTable";
import PansionServiceContext from "../../context/PansionServiceContext";
import FullPageSpinner from "../../components/spinners/FullPageSpinner";
import RoomsDeleteModalForm from "./RoomsDeleteModalForm";
import RoomsDetails from './RoomsDetail'


function RoomsContent(props) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [isDeleteModalFormOpen, setIsDeleteModalFormOpen] = useState(false);

  //FETCHROOMS
  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await PansionService.getRooms();
    if (hasError) {
      console.log("Ошибка с сервером видимо: ", hasError);
    } else {
      setRooms(data);
    }
    setIsLoading(false);
    return null;
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  //REFETCHROOMS
  const reFetchRooms = useCallback(() => fetchRooms(), []);

  //DELETEROOM
  const openDeleteModalForm = useCallback(() => {
    setIsDeleteModalFormOpen(true);
  }, []);

  const closeDeleteModalForm = useCallback(() => {
    setIsDeleteModalFormOpen(false);
  }, []);

  const onClickDelete = useCallback((room) => {
    setSelectedRoom(room);
    openDeleteModalForm();
  }, []);


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
          {isLoading ? (
            <FullPageSpinner />
          ) : (
            <RoomsTable
             rooms={rooms}
             onClickDelete={onClickDelete}
             selectedRoom={selectedRoom}
             />
          )}
        </CCardBody>
      </CCard>
      {selectedRoom && (
        <RoomsDeleteModalForm
          closeDeleteModalForm={closeDeleteModalForm}
          isDeleteModalFormOpen={isDeleteModalFormOpen}
          selectedRoom={selectedRoom}
          reFetchRooms={reFetchRooms}
        />
      )}
      { selectedRoom && (
        <RoomsDetails
          selectedRoom={selectedRoom}
          reFetchRooms={reFetchRooms}

        />
      )}
    </>
  );
}

export default RoomsContent;
