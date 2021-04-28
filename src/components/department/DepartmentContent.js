import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import DepartmentTable from "./DepartmentTable";
import DepartmentCreateModalForm from "./DepartmentCreateModalForm";
import DepartmentEditModalForm from "./DepartmentEditModalForm";
import DepartmentDeleteModal from "./DepartmentDeleteModal";
import PansionServiceContext from "../../context/PansionServiceContext";
import FullPageSpinner from "../spinners/FullPageSpinner";

function DepartmentContent(props) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [isCreateModalFormOpen, setIsCreateModalFormOpen] = useState(false);
  const [isEditModalFormOpen, setIsEditModalFormOpen] = useState(false);
  const [isDeleteModalFormOpen, setIsDeleteModalFormOpen] = useState(false);

  //FETCH DEPARTMENT
  const fetchDepartment = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await PansionService.getDepartment();
    if (hasError) {
      console.log(hasError);
    } else {
      setDepartments(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDepartment();
  }, []);

  //REFETCH DEPARTMENT
  const reFetchDepartment = useCallback(async () => fetchDepartment(), []);

  //DELETE DEPARTMENT
  const openDeleteModalForm = useCallback(
    () => setIsDeleteModalFormOpen(true),
    []
  );
  const closeDeleteModalForm = useCallback(
    () => setIsDeleteModalFormOpen(false),
    []
  );
  const onClickDelete = useCallback((department) => {
    setSelectedDepartment(department);
    openDeleteModalForm();
  }, []);

  //CREATE DEPARTMENT
  const openCreateModalForm = useCallback(
    () => setIsCreateModalFormOpen(true),
    []
  );

  const closeCreateModalForm = useCallback(
    () => setIsCreateModalFormOpen(false),
    []
  );

  //EDIT DEPARTMENT
  const openEditModalForm = useCallback(() => setIsEditModalFormOpen(true), []);

  const closeEditModalForm = useCallback(() => {
      setIsEditModalFormOpen(false)
      setSelectedDepartment(null)

    },[]);

  const onClickEdit = useCallback((department) => {
    setSelectedDepartment(department);
    openEditModalForm();
  }, []);

  return (
    <>
      <CCard className="p-2">
        <CCardHeader>
          <CRow>
            <CCol>Управление отделами</CCol>
            <CCol>
              <CButton
                color="primary"
                className="float-right"
                onClick={openCreateModalForm}
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
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        </CCardBody>
      </CCard>
      <DepartmentCreateModalForm
        setDepartments={setDepartments}
        departments={departments}
        isCreateModalFormOpen={isCreateModalFormOpen}
        openCreateModalForm={openCreateModalForm}
        closeCreateModalForm={closeCreateModalForm}
        reFetchDepartment={reFetchDepartment}
      />
      {selectedDepartment && (
        <DepartmentEditModalForm
          isEditModalFormOpen={isEditModalFormOpen}
          openEditModalForm={openEditModalForm}
          closeEditModalForm={closeEditModalForm}
          reFetchDepartment={reFetchDepartment}
          selectedDepartment={selectedDepartment}
        />
      )}
      {selectedDepartment && (
        <DepartmentDeleteModal
          isDeleteModalFormOpen={isDeleteModalFormOpen}
          closeDeleteModalForm={closeDeleteModalForm}
          selectedDepartment={selectedDepartment}
          reFetchDepartment={reFetchDepartment}
        />
      )}
    </>
  );
}

export default DepartmentContent;
