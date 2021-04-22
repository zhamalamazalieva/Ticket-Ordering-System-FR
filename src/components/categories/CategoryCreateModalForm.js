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

function CategoryCreateModalForm({
  isCreateModalFormOpen,
  closeCreateModalForm,
  reFetchCategories,
}) {

  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const onSubmit = async (values) => {

    setIsLoading(true);
    const { hasError, data } = await PansionService.createCategory(values.title, values.description);
    if (hasError) {
      console.log("errorrrrrr");
    } else {
      reFetchCategories();
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
        !values.title && (errors.title = "Обязательное поле");
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
                Добавление новой категории
              </CModalHeader>
              <CModalBody>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel htmlFor="start_date">Категория</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                          required
                          id="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.title && touched.title
                              ? "border-error"
                              : ""
                          }
                        />
                        {
                          <span className="text-danger">
                            {errors.title  &&
                              touched.title  &&
                              errors.title }
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
  title: "",
  description: "",


};

export default CategoryCreateModalForm;
