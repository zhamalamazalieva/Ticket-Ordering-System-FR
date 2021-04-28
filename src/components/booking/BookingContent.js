import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
} from "@coreui/react";
import { useState, useEffect, useContext } from "react";
import PansionServiceContext from "../../context/PansionServiceContext";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDatesRange, getDates } from "src/utils/date";

const BookingContent = () => {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelecredCategory] = useState({});
  const [fetchCategoryError, setFetchCategoryError] = useState(null);

 const [startDate, setStartDate] = useState(null)
 const [endDate, setEndDate] = useState(null)
 const [excludedDays, setExcludedDays] = useState([])

 const onChange = (dates) => {
  const [start, end] = dates
  const dts = getDatesRange(Date.parse(start), Date.parse(end))
  setStartDate(start)
  setEndDate(end)
 }

 const tickets = [
   { start_date: "2021-05-01", end_date: "2021-05-20"},
   { start_date: "2021-06-10", end_date: "2021-06-25"}
 ]
 useEffect(() => {
      let _excludedDays = []
      tickets.forEach((ticket) => {
          const startDay = Date.parse(ticket.start_date)
          const endDay = Date.parse(ticket.end_date)
          Array.prototype.push.apply(_excludedDays, getDates(startDay, endDay))
      })
      setExcludedDays(_excludedDays)
 },[])



  useEffect(() => {
    const fetchCategory = async () => {
      const { hasError, data } = await PansionService.getCategories();
      if (hasError) {
        setFetchCategoryError("Произошла ошибка при заргрузке категорий");
      } else {
        const cat = data.map((c) => ({ value: c.id, label: `${c.title}` }));
        setCategories(cat);
        cat[0] && setSelecredCategory(cat[0]);
      }
    };
    fetchCategory();
  }, [PansionService]);

  return (
    <CCard>
      <CCardHeader className="">
        <h5>Забронировать номер</h5>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow>
            <CCol className="col-3">
              <CCol className="mb-3">
                <CRow>
                  <h6>Дата заезда:</h6>
                </CRow>
                <CRow>
                  <DatePicker
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    disabled
                    selected={startDate}
                  />
                </CRow>
              </CCol>
              <CCol>
                <CRow>
                  <h6>Дата выезда:</h6>
                </CRow>
                <CRow>
                  <DatePicker
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    disabled
                    selected={endDate}
                  />
                </CRow>
              </CCol>
            </CCol>
            <CCol className="col-9 mb-3">
              <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              monthsShown={3}
              excludeDates={excludedDays}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol className="col-3">
              <CLabel htmlFor="first_name">Количество мест в номере</CLabel>
              <CInput required type="number" min="1" />
            </CCol>
            <CCol className="col-3">
              <CRow className="col-12">
                <CLabel htmlFor="first_name">Категория номера</CLabel>
              </CRow>
              {fetchCategoryError ? (
                <span className="text-danger">{fetchCategoryError}</span>
              ) : (
                <Select
                  options={categories}
                  value={selectedCategory}
                  onChange={(s) => setSelecredCategory(s)}
                />
              )}
            </CCol>
            <CCol className="col-3">
              <CLabel htmlFor="first_name">Общая сумма</CLabel>
              <CCol className="b-shadow rounded col-4 p-2">
                4515 с
              </CCol>
            </CCol>
          </CRow>
          <CRow></CRow>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" size="sm" color="primary" className="p-2">
          Забронировать
        </CButton>
        <CButton type="reset" size="sm" color="danger" className="p-2 ml-3">
          Отмена
        </CButton>
      </CCardFooter>
    </CCard>
  );
};
export default BookingContent;
