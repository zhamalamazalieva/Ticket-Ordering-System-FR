import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react"
import DepartmentTable from "./DepartmentTable"
import DepartmentCreateModalForm from "./DepartmentCreateModalForm"
import DepartmentEditModalForm from "./DepartmentEditModalForm"
import DepartmentDeleteModal from "./DepartmentDeleteModal"
import PansionServiceContext from "../../context/PansionServiceContext"
import FullPageSpinner from "../spinners/FullPageSpinner"


function DepartmentContent( props ) {

  const PansionService = useContext(PansionServiceContext)


  const [isLoading, setIsLoading] = useState(false)
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState(null)


  const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false)
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false)
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  
  //FETCH DEPARTMENT
  const fetchDepartment = useCallback( async () => {
    setIsLoading(true)
    const { hasError, data } = await PansionService.getDepartment();
    if (hasError) {
      console.log( hasError )
    } else {
      setDepartments(data)
    }
    setIsLoading(false)
  }, [])

  
  useEffect(() => {
    fetchDepartment()
  }, [])

  const reFetchDepartment = useCallback( async() =>
   fetchDepartment(), [])


  //DELETE DEPARTMENT
  const openDeleteConfirmModal = useCallback(
    () => setIsDeleteConfirmModalOpen(true),[])

  const closeDeleteConfirmModal = useCallback(
    () => setIsDeleteConfirmModalOpen(false), [])

  const onDeleteClick = useCallback((department) => {
    setSelectedDepartment(department)
    openDeleteConfirmModal()
  }, [])

  
  //CREATE DEPARTMENT 
  const openCreateFormModal = useCallback(
    () => setIsCreateFormModalOpen(true),[])
  
  const closeCreateFormModal = useCallback(
    () => setIsCreateFormModalOpen(false),[])

  
  //EDIT DEPARTMENT
  const openEditFormModal = useCallback(
    () => setIsEditFormModalOpen(true), [])

  const closeEditFormModal = useCallback(
    () => setIsEditFormModalOpen(false),
    []
  )

  const onEditClick = useCallback((department) => {
    setSelectedDepartment(department)
    openEditFormModal()
  }, [])



  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>Управление отделами</CCol>
            <CCol>
              <CButton
                color="primary"
                className="float-right"
                onClick={openCreateFormModal}
              >
                <span className="mr-3">Добавить отдел</span>
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {isLoading ? "Loading..." : ""}
          <DepartmentTable
            departments={departments}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        </CCardBody>
      </CCard>
      <DepartmentCreateModalForm
        setDepartments={setDepartments}
        departments={departments}
        isFormModalOpen={isCreateFormModalOpen}
        openFormModal={openCreateFormModal}
        closeFormModal={closeCreateFormModal}
        reFetchDepartment={reFetchDepartment}
      />
      {selectedDepartment && (
        <DepartmentEditModalForm
          isFormModalOpen={isEditFormModalOpen}
          openFormModal={openEditFormModal}
          closeFormModal={closeEditFormModal}
          reFetchDepartment={reFetchDepartment}
          selectedDepartment={selectedDepartment}
        />
      )}
      {selectedDepartment && (
        <DepartmentDeleteModal
          isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
          closeDeleteConfirmModal={closeDeleteConfirmModal}
          selectedDepartment={selectedDepartment}
          reFetchDepartment={reFetchDepartment}
        />
      )}
    </>
  );
}

export default DepartmentContent;
