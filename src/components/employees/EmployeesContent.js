import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
  } from "@coreui/react";
import React, { useState,useContext, useEffect, useCallback} from 'react'
import PansionServiceContext from "../../context/PansionServiceContext"
import EmployeeCreateFormModal from "./EmployeeCreateFormModal";
import EmployeeDeleteModal from "./EmployeeDeleteModal";
import EmployeesTable from './EmployeesTable';


function EmployeesContent( props){
    const PansionService  = useContext(PansionServiceContext)

    const [isLoading, setIsLoading] = useState(false)
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false)
    const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false)

   

    const fetchEmployees = useCallback(async () => {
        setIsLoading(true);
        const { hasError, data } = await PansionService.getEmployees();
        if( hasError){
            console.log(hasError)
        }
        else{
            setEmployees(data)
        }
        setIsLoading(false)
    },[])

    useEffect(() => {
        fetchEmployees()
    }, [])

    const reFetchEmployees = useCallback( async ()=> {
        fetchEmployees()
    },[])

//DELETE USER
    const openDeleteConfirmModal = useCallback( async () => setIsDeleteConfirmModalOpen(true), [])
    const closeDeleteConfirmModal = useCallback( async () => setIsDeleteConfirmModalOpen(false), [])

    const onClickDelete = useCallback( (employee) => {
        setSelectedEmployee(employee)
        openDeleteConfirmModal()
    },[])


//CREATE USER
    const openCreateFormModal = useCallback(() => {
      setIsCreateFormModalOpen(true)
    }, [])
    const closeCreateFormModal =  useCallback(() => {
      setIsCreateFormModalOpen(false)
    }, [])

    return(
            <>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>Управление сотрудниками со льготой</CCol>
                    <CCol>
                      <CButton
                        color="primary"
                        className="float-right"
                        onClick={openCreateFormModal}
                      >
                        <span className="mr-3">Добавить сотрудника</span>
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                    {
                        isLoading ? "Loading...":""
                    }
                    <EmployeesTable
                        employees={employees}
                        onClickDelete={onClickDelete}
                    />
                </CCardBody>
              </CCard>
              {
                isCreateFormModalOpen && 
                <EmployeeCreateFormModal
                  openFormModal={openCreateFormModal}
                  isFormModalOpen={isCreateFormModalOpen}
                  closeFormModal={closeCreateFormModal}
                  setEmployees={setEmployees}
                  employees={employees}
                  reFetchEmployees={reFetchEmployees}              
              />
              }
              {selectedEmployee && (
                  <EmployeeDeleteModal
                    isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
                    closeDeleteConfirmModal={closeDeleteConfirmModal}
                    selectedEmployee={selectedEmployee}
                    reFetchEmployees={reFetchEmployees}
                  />
              )}
            </>
          );
}
export default EmployeesContent;

