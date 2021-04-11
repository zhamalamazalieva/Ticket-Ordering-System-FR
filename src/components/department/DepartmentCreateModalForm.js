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
import { Formik } from "formik";
import MiniSpinner from "../spinners/MiniSpinner";

function DepartmentCreateModalForm({
  isFormModalOpen,
  closeFormModal,
  openFormModal,
  reFetchDepartment,
}) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const onSubmit = async (values) => {
    setCreateError(null);
    setIsLoading(true);

    const { hasError, data } = await PansionService.createDepartment(
      values.depName,
    );

    if (hasError) {
      setCreateError((data && data.detail) || "Что-то пошло не так!");
    } else {
      reFetchDepartment();
      closeFormModal();
    }

    setIsLoading(false);
  };

  return (
    <>
      <CModal
        show={isFormModalOpen}
        onClose={closeFormModal}
        size="sm"
        centered
      >
        <Formik
          initialValues={formValues}
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            !values.depName && (errors.depName = "Обязательное поле");

            return errors;
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <CForm onSubmit={handleSubmit}>
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
                          id="city"
                          value={values.depName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.depName && touched.depName ? "border-error" : ""
                          }
                        />
                        {
                          <span className="text-danger">
                            {errors.depName && touched.depName && errors.depName}
                          </span>
                        }
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
          )}
        </Formik>
      </CModal>
    </>
  );
}

const formValues = { depName: "" };

export default DepartmentCreateModalForm;
