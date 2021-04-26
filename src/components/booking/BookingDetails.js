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
import { DatePicker, RangePicker } from "react-trip-date";
import { ThemeProvider } from "styled-components";



const handleResponsive = (setNumberOfMonth) => {
  let width = document.querySelector(".tp-calendar").clientWidth;
  if (width > 900) {
    setNumberOfMonth(3);
  } else if (width < 900 && width > 580) {
    setNumberOfMonth(2);
  } else if (width < 580) {
    setNumberOfMonth(1);
  }
};

const Day = ({ day }) => {
  return (
    <>
      <p className="date">{day.format("DD")}</p>
      <p className="date">7</p>
    </>
  );
};

function BookingDetails({}) {
  const PansionService = useContext(PansionServiceContext);

  const [value, onChange] = useState(new Date());
  console.log("valueshka: ", value)
  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();

  const [selectedDate, setSelectedDate] = useState(new Date())

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
              <ThemeProvider theme={theme}>
                    <DatePicker
                     
                      selectedDays={[selectedDate]} //initial selected days
                      jalali={false}
                      numberOfMonths={2}
                      numberOfSelectableDays={30} // number of days you need
                      disabledDays={["2019-12-02"]} //disabeld days
                      responsive={handleResponsive} // custom responsive, when using it, `numberOfMonths` props not working
                      disabledBeforToday={true}
                      disabled={false} // disable calendar
                      dayComponent={Day} //custom day component
                      // titleComponent={Title} // custom title of days
                    />
                  </ThemeProvider>
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
const theme = {
  primary: {
    light: "#d0f4f0",
    main: "#13c8b5",
    dark: "#12baa9",
  },
  grey: {
    700: "#707070",
    900: "#1b1b1d",
  },
  background: {
    default: "#f5f5f5",
  },
  text: {
    disabled: "#BABABA",
  },
};