import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardSubtitle,
  CCardFooter,
  CCol,
  CRow,
  CBadge,
} from "@coreui/react";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import PansionServiceContext from "../../context/PansionServiceContext";

function RoomsDetails({
  isRoomsDetailsOpen,
  closeRoomsDetails,
  selectedRoom,
  reFecthRooms,
}) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();

  const fetchRoomDetails = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await PansionService.getRoomDetails(roomId);
    if (hasError) {
      console.log("Ошибка с сервером: ", hasError);
    } else {
      setRoom(data);
    }
    setIsLoading(false);
    return null;
  }, []);

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  return (
    <>
      {" "}
      {room && (
        <div className="c-main container-fluid">
          <CCard>
            <CCardHeader className="">
              <h5>Информация о номере </h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol className="col-7">
                  <CRow className="mb-3">
                    <CCol className="col-3">
                      <h6>Номер:</h6>
                    </CCol>
                    <CCol className="b-shadow rounded col-9 p-2">
                      {room.title}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol className="col-3">
                      <h6>Описание:</h6>
                    </CCol>
                    <CCol className="b-shadow rounded col-9 p-2">
                      {room.description}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="col-3">
                      <h6>Категория номера:</h6>
                    </CCol>
                    <CCol className="b-shadow rounded col-9 p-2">
                      {room.category}
                    </CCol>
                  </CRow>
                </CCol>
                <CCol className="col-5">
                  <CRow className="mb-3">
                    <CCol className="col-5">
                      <h6>Количество мест:</h6>
                    </CCol>
                    <CCol className="b-shadow rounded col-4 p-2">
                      {room.seats}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol className="col-5">
                      <h6>Цена:</h6>
                    </CCol>
                    <CCol className="b-shadow rounded col-4 p-2">
                      {room.price}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="col-5">
                      <h6>Статус номера:</h6>
                    </CCol>
                    <CCol className="col-4">
                      <CBadge color="secondary">{room.status}</CBadge>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" className="p-2">
                Забронировать
              </CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                className="p-2 ml-3"
              >
                Отмена
              </CButton>
            </CCardFooter>
          </CCard>
        </div>
      )}
    </>
  );
}
export default RoomsDetails;
