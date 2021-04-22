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
import PansionServiceContext from "../../context/PansionServiceContext";
import FullPageSpinner from "../spinners/FullPageSpinner";
import PositionsTable from './PositionsTable'
import PositionDeleteModalForm from './PositionDeleteModalForm'
import PositionCreateModalForm from './PositionCreateModalForm'
import PositionEditModalForm from './PositionEditModalForm'

function PositionsContent(props) {

  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [positions, setPositions] = useState([])
  const [selectedPosition, setSelectedPosition] = useState(null)

  const [isDeleteModalFormOpen, setIsDeleteModalFormOpen] = useState(false)
  const [isCreateModalFormOpen, setIsCreateModalFormOpen] = useState(false)
  const [isEditModalFormOpen, setIsEditModalFormOpen] = useState(false)

  //FETCHPositions
  const fetchPositions = useCallback( async () => {
      setIsLoading(true)
      const { hasError, data } = await PansionService.getPositions()
      if( hasError) {
          console.log('Ошибка при запросе GET')
      }
      else {
          setPositions(data)
      }
      setIsLoading(false)
  }, [])


  useEffect(() => {
      fetchPositions()
  },[])

  //REFETCHPositions
  const reFetchPositions = useCallback( async () => {
      fetchPositions()
  },[])

  //DELETEPosition
  const openDeleteModalForm = useCallback( async () => {
    setIsDeleteModalFormOpen(true)
  },[])

  const closeDeleteModalForm = useCallback( async () => { 
    setIsDeleteModalFormOpen(false)
  },[])

  const onClickDelete = useCallback(async (Position) => {
    setSelectedPosition(Position)
    openDeleteModalForm()
  },[])

  //CREATEPosition
  const openCreateModalForm = useCallback(() => { setIsCreateModalFormOpen(true)},[])
  const closeCreateModalForm = useCallback(() => { setIsCreateModalFormOpen(false)},[])

  //EDITPosition
  const openEditModalForm = useCallback(() => { setIsEditModalFormOpen(true)},[])
  const closeEditModalForm = useCallback(() => { setIsEditModalFormOpen(false)},[])
  const onCLickEdit = useCallback(position => { 
    setSelectedPosition(position) 
    openEditModalForm()},[])

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>Управление потоками</CCol>
            <CCol>
              <CButton color="primary" className="float-right" onClick={openCreateModalForm}>
                <span className="mr-3">Добавить поток</span>
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {isLoading ? <FullPageSpinner />
           : (
            <PositionsTable
                positions={positions}
                onClickDelete={onClickDelete}
                onClickEdit={onCLickEdit}
             />
          )}
        </CCardBody>
      </CCard>
      {isCreateModalFormOpen && (
        <PositionCreateModalForm
         closeCreateModalForm={closeCreateModalForm}
         isCreateModalFormOpen={isCreateModalFormOpen}
         positions={positions}
         reFetchPositions={reFetchPositions}        
        
        />
      )
      }
      { selectedPosition &&
        <PositionDeleteModalForm
            isDeleteModalFormOpen={isDeleteModalFormOpen}
            closeDeleteModalForm={closeDeleteModalForm}
            selectedPosition={selectedPosition}
            reFetchPositions={reFetchPositions}
        />
      }
      { selectedPosition && 
        <PositionEditModalForm
          isEditModalFormOpen={isEditModalFormOpen}
          closeEditModalForm={closeEditModalForm}
          selectedPosition={selectedPosition}
          reFetchPositions={reFetchPositions}
        />
      }
    </>
  );
}

export default PositionsContent;
