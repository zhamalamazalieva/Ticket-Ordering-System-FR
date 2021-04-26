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
  isCreateModalFormOpen,
  closeCreateModalForm,
  departments,
  setDepartments,
}) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const [newDepartment, setNewDepartment] = useState({
    title: "",
    description: "",
  });

  const saveDepartment = (e) => {
    setNewDepartment({
      title: e.target.form[1].value,
      description: e.target.form[2].value,
    });
  };

  const onSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const { data, hasError } = await PansionService.createDepartment(
      newDepartment
    );
    if (hasError) {
      setCreateError("Что-то пошло не так!");
    } else {
      setDepartments([...departments, data]);
      closeCreateModalForm();
      setNewDepartment({
        title: "",
        description: "",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <CModal
        show={isCreateModalFormOpen}
        onClose={closeCreateModalForm}
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
                        onChange={(e) => saveDepartment(e)}
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
                        onChange={(e) => saveDepartment(e)}
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
              <CButton color="secondary" onClick={closeCreateModalForm}>
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
