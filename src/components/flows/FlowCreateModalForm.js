import React, { useState, useContext} from "react";
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
import { Formik } from "formik";

function FlowCreateModalForm({
  isCreateModalFormOpen,
  closeCreateModalForm,
  reFetchFlows,
}) {

  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const onSubmit = async (values) => {

    setIsLoading(true);
    const { hasError, data } = await PansionService.createFlow(values.start_date, values.end_date, values.title, values.description);
    if (hasError) {
      console.log("errorrrrrr");
    } else {
      reFetchFlows();
      closeCreateModalForm()
      console.log("Uspeshno");

    }
    setIsLoading(false);
  };
  

  return (
    <Formik
      initialValues={formValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        !values.start_date && (errors.start_date = "Обязательное поле");
        !values.end_date && (errors.end_date = "Обязательное поле");
        return errors;
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        touched,
        handleBlur,
        errors,
        handleReset,
      }) => (
        <CModal
          show={isCreateModalFormOpen}
          onClose={closeCreateModalForm}
          size="sm"
          centered
        >
          <CModalBody>
            <CForm onSubmit={handleSubmit}>
              <CModalHeader closeButton>
                Добавление нового потока
              </CModalHeader>
              <CModalBody>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel htmlFor="start_date">Начало потока</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                          required
                          id="start_date"
                          value={values.start_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="date"
                          className={
                            errors.start_date && touched.start_date
                              ? "border-error"
                              : ""
                          }
                        />
                        {
                          <span className="text-danger">
                            {errors.start_date &&
                              touched.start_date &&
                              errors.start_date}
                          </span>
                        }
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel htmlFor="end_date">Конец потока</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                          required
                          id="end_date"
                          type="date"
                          value={values.end_date}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel htmlFor="title">Поток</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                          required
                          id="title"
                          value={values.title}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel htmlFor="description">Описание</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                          required
                          id="description"
                          value={values.description}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
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
      )}
    </Formik>
  );
}
const formValues = {
  start_date: "",
  end_date: "",
  title: "",
  description: "",

};

export default FlowCreateModalForm;
