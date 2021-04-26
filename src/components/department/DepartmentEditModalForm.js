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
import PansionServiceContext from "../../context/PansionServiceContext";
import MiniSpinner from "../spinners/MiniSpinner";

function DepartmentEditModalForm({
  isEditModalFormOpen,
  closeEditModalForm,
  reFetchDepartment,
  selectedDepartment,
}) {

  const PansionService = useContext(PansionServiceContext)

  const [isLoading, setIsLoading] = useState(false)
  const [editError, setEditError] = useState(null)


  const [title, setTitle] = useState(selectedDepartment.title)
  const [description, setDescription] = useState(
    selectedDepartment.description
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const { hasError, data } = await PansionService.updateDepartment({
      id: selectedDepartment.id,
      title,
      description,
    });
    if (hasError) {
      setEditError("Что-то пошло не так");
    } else {
      closeEditModalForm();
      reFetchDepartment();
    }
  };

  return (
    <>
      <CModal
        show={isEditModalFormOpen}
        onClose={closeEditModalForm}
        size="sm"
        centered
      >
        <CModalBody>
          <CForm onSubmit={(e) => onSubmit(e)}>
            <CModalHeader closeButton>Изменение филиала</CModalHeader>
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
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
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
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              {isLoading ? (
                <div className="mr-5"><MiniSpinner/></div>
              ) : (
                <CButton color="primary" type="submit">
                  Изменить
                </CButton>
              )}
              <CButton color="secondary" onClick={closeEditModalForm}>
                Cancel
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
}
export default DepartmentEditModalForm;
