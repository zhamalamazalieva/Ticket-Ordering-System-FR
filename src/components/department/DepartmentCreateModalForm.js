import React, { useState, useContext } from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CButton,
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
} from "@coreui/react";
import MiniSpinner from "../spinners/MiniSpinner";
import PansionServiceContext from "../../context/PansionServiceContext";

function DepartmentCreateModalForm({
  isFormModalOpen,
  closeFormModal,
  departments,
  setDepartments,
  reFetchDepartment,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const PansionService = useContext(PansionServiceContext);

  const [newDepartment, setNewDepartment] = useState({
    title: "",
    description: "",
  });

  const saveDepartment = (event) => {
    setNewDepartment({
      title: event.target.form[1].value,
      description: event.target.form[2].value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const {data } = await PansionService.createDepartment(
      newDepartment
    );
    setDepartments([...departments, data]);
    closeFormModal();
    setNewDepartment({
      title: "",
      description: "",
    });
  };

  return (
    <>
      <CModal
        show={isFormModalOpen}
        onClose={closeFormModal}
        size="sm"
        centered
      >
        <CModalBody>
          <CForm onSubmit={(event) => onSubmit(event)}>
            <CModalHeader closeButton>Добавление отдела</CModalHeader>
            <CModalBody>
              <CRow>
                <CCol>
                  <CFormGroup row>
                    <CCol xs="12">
                      <CLabel htmlFor="city">Отдел</CLabel>
                    </CCol>
                    <CCol xs="12">
                      <CInput
                      required
                        id="depName"
                        onChange={(event) => saveDepartment(event)}
                        value={newDepartment.title}
                        type="text"
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormGroup row>
                    <CCol xs="12">
                      <CLabel htmlFor="city">Описание</CLabel>
                    </CCol>
                    <CCol xs="12">
                      <CInput
                      required
                        id="description"
                        onChange={(event) => saveDepartment(event)}
                        value={newDepartment.description}
                        type="text"
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              {createError && (
                <CRow>
                  <CCol>
                    <span className="text-danger">{createError}</span>
                  </CCol>
                </CRow>
              )}
            </CModalBody>
            <CModalFooter>
              {isLoading ? (
                <div className="mr-5">
                  <MiniSpinner />
                </div>
              ) : (
                <CButton color="primary" type="submit">
                  Добавить
                </CButton>
              )}
              <CButton color="secondary" onClick={closeFormModal}>
                Cancel
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
}
export default DepartmentCreateModalForm;
