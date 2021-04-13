import React, { useState, useEffect, useContext } from "react";
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
  CSelect,
  CForm,
} from "@coreui/react";
import PansionServiceContext from "../../context/PansionServiceContext";
import MiniSpinner from "../spinners/MiniSpinner";

function DepartmentCreateModalForm({
  isFormModalOpen,
  closeFormModal,
  reFetchDepartment,
  department
}) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const [ newDep, setNewDep ] = useState({
    depName:'',
    description:''
  }) 

  const saveDep = (event) => {
      setNewDep({
        depName: event.target.form[0].value,
        description: event.target.form[1].value,
      })    
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setNewDep([...department, newDep])
    setNewDep({
      depName:'',
      description:''
    })
  }

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
                      <CCol xs="3">
                        <CLabel htmlFor="city">Отдел</CLabel>
                      </CCol>
                      <CCol xs="9">
                        <CInput
                          id="depName"
                          onChange={(event) => saveDep(event)}
                          value={newDep.depName}
                          type="text"
                        />
                       
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="3">
                        <CLabel htmlFor="city">Описание</CLabel>
                      </CCol>
                      <CCol xs="9">
                        <CInput
                          id="description"
                          onChange={(event) => saveDep(event)}
                          value={newDep.description}
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
                    <MiniSpinner/>
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
