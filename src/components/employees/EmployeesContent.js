import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useState, useContext, useEffect, useCallback } from "react";
import PansionServiceContext from "../../context/PansionServiceContext";
import EmployeeCreateModalForm from "./EmployeeCreateModalForm";
import EmployeeDeleteModal from "./EmployeeDeleteModal";
import EmployeesTable from "./EmployeesTable";
import EmployeeEditModalForm from "./EmployeeEditModalForm";
import FullPageSpinner from "../spinners/FullPageSpinner";

function EmployeesContent(props) {

  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false);
  const [isEditModalFormOpen, setIsEditModalFormOpen] = useState(false);

  //GETEMPLOYEES
  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await PansionService.getEmployees();
    if (hasError) {
      console.log("ошиька ", hasError);
    } else {
      setEmployees(data);
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    fetchEmployees();
  }, []);

  //REFETCHEMPLOYEES
  const reFetchEmployees = useCallback(async () => {
    fetchEmployees();
  }, []);

  //DELETEEMPLOYEES
  const openDeleteConfirmModal = useCallback(
    async () => setIsDeleteConfirmModalOpen(true),
    []
  );
  const closeDeleteConfirmModal = useCallback(
    async () => setIsDeleteConfirmModalOpen(false),
    []
  );
  const onClickDelete = useCallback((employee) => {
    setSelectedEmployee(employee);
    openDeleteConfirmModal();
  }, []);

  //CREATEEMPLOyEES
  const openCreateFormModal = useCallback(() => {
    setIsCreateFormModalOpen(true);
  }, []);
  const closeCreateFormModal = useCallback(() => {
    setIsCreateFormModalOpen(false);
  }, []);

  //EDITEMPLOYEES
  const openEditModalForm = useCallback(( ) => {
    setIsEditModalFormOpen(true);

  },[]);
  const closeEditModalForm = useCallback(() => {
    setIsEditModalFormOpen(false);
    setSelectedEmployee(null)
  },[]);

  const onClickEdit = useCallback(( employee) => {
    setSelectedEmployee(employee)
    openEditModalForm()
    console.log('opened')
  },[])
  return (
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
          {isLoading ? <FullPageSpinner/> : (
          <EmployeesTable
            employees={employees}
            onClickDelete={onClickDelete}
            onClickEdit={onClickEdit}
          />)}
        </CCardBody>
      </CCard>
      {isCreateFormModalOpen && (
        <EmployeeCreateModalForm
          openFormModal={openCreateFormModal}
          isFormModalOpen={isCreateFormModalOpen}
          closeFormModal={closeCreateFormModal}
          setEmployees={setEmployees}
          employees={employees}
          reFetchEmployees={reFetchEmployees}
        />
      )}
      {selectedEmployee && (
        <EmployeeDeleteModal
          isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
          closeDeleteConfirmModal={closeDeleteConfirmModal}
          selectedEmployee={selectedEmployee}
          reFetchEmployees={reFetchEmployees}
        />
      )}
      {selectedEmployee && (
        <EmployeeEditModalForm
          isEditModalFormOpen={isEditModalFormOpen}
          closeEditModalForm={closeEditModalForm}
          selectedEmployee={selectedEmployee}
          reFetchEmployees={reFetchEmployees}
        />
      )}
    </>
  );
}
export default EmployeesContent;
