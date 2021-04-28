import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CBadge,
  CForm,
  CInput,
} from "@coreui/react";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import PansionServiceContext from "../../context/PansionServiceContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDatesRange, getDates } from "../../utils/date";


const tickets = [
  { start_date: "2021-04-27", end_date: "2021-04-30" },
  { start_date: "2021-05-10", end_date: "2021-05-30" },
];

function BookingDetails({}) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [excludedDays, setExcludedDays] = useState([]);

  useEffect(() => {
    let _excludedDays = [];
    tickets.forEach((ticket) => {
      const start_day = Date.parse(ticket.start_date);
      const end_day = Date.parse(ticket.end_date);
      Array.prototype.push.apply(_excludedDays, getDates(start_day, end_day));
    });
    setExcludedDays(_excludedDays);
  }, []);


  const onChange = (dates) => {
    const [start, end] = dates;

    const dts = getDatesRange(Date.parse(start), Date.parse(end));
    setStartDate(start);
    setEndDate(end);
  };

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
      {room && (
        <div className="c-main container-fluid col-12">
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
                  <CRow>
                    <CCol className="col-3">
                      <h6>Категория номера:</h6>
                    </CCol>
                    <CCol className="b-shadow rounded col-9 p-2">
                      {room && room.category && room.title}
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
                      <h6>Сумма:</h6>
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
              <CRow>
                <CCol className="col-7">
                  <CRow className="mb-3">
                    <CCol className="col-3">
                      <h6>Дата заезда:</h6>
                    </CCol>
                    <CCol className="col-3 p-0">
                      <DatePicker
                        selected={startDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        disabled
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol className="col-3">
                      <h6>Дата выезда:</h6>
                    </CCol>
                    <CCol className="col-3 p-0">
                      <DatePicker
                        selected={endDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        disabled
                      />
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                excludeDates={excludedDays}
                inline
                monthsShown={4}
              />
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
export default BookingDetails;
