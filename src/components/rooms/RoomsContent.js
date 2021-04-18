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
import PansionServiceContext from '../../context/PansionServiceContext'
import FullPageSpinner from '../../components/spinners/FullPageSpinner'


function RoomsContent(props) {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const PansionService = useContext(PansionServiceContext)

  const fetchRooms =  useCallback( async () => {
    setIsLoading(true)
    const { hasError, data } = await PansionService.getRooms()
    if( hasError) {
      console.log(hasError);
    }
    else{
      setRooms(data)
    }
    setIsLoading(false)
  }, [])


  useEffect(() => {
    fetchRooms()
  },[])


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
          { isLoading ? <FullPageSpinner/> : (
          <RoomsTable
           rooms={rooms.map( r => ({...r, size: `${r.latitude} ${r.longitude}`}))}
           setRooms={setRooms}
          />)}
        </CCardBody>
      </CCard>
    </>
  );
}

export default RoomsContent;
