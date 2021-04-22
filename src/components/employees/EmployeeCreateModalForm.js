import React, { useState, useContext, useEffect } from "react";
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
import Select from "react-select";
import { Formik } from "formik";

function EmployeeCreateModalForm({
  isFormModalOpen,
  closeFormModal,
  reFetchEmployees,
}) {
  const PansionService = useContext(PansionServiceContext);

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  const [fetchDepartmentError, setFetchDepartmentError] = useState(null);
  const [fetchPositionsError, setFetchPositionsError] = useState(null);


  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [selectedPosition, setSelectedPosition] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      const { hasError, data } = await PansionService.getDepartment();
      if (hasError) {
        setFetchDepartmentError("Произошла ошибка при загрузке отделов");
      } else {
        const dep = data.map((d) => ({ value: d.id, label: `${d.title}` }));
        setDepartments(dep);
        dep[0] && setSelectedDepartment(dep[0]);
      }
      return null;
    };
    fetchDepartments();
  }, [PansionService]);

  useEffect(() => {
    const fetchPositions = async () => {
      const { hasError, data } = await PansionService.getPositions();
      if (hasError) {
        setFetchPositionsError("Произошла ошибка при загрузке отделов");
      } else {
        const pos = data.map((p) => ({ value: p.id, label: `${p.title}` }));
        setPositions(pos);
        pos[0] && setSelectedDepartment(pos[0]);
      }
      return null;
    };
    fetchPositions();
  }, [PansionService]);


  const onSubmit = async (values) => {
    console.log("Uspeshno");

    setIsLoading(true);
    const { hasError, data } = await PansionService.createEmployees({
      ...values,
      department: selectedDepartment.value,
      position: selectedPosition.value,
    });
    if (hasError) {
      console.log("errorrrrrr");
    } else {
      reFetchEmployees();
      closeFormModal();
    }
    setIsLoading(false);
  };
  

  return (
    <Formik
      initialValues={formValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        !values.first_name && (errors.first_name = "Обязательное поле");
        !values.last_name && (errors.last_name = "Обязательное поле");
        console.log("owibka: ", errors);
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
          show={isFormModalOpen}
          onClose={closeFormModal}
          size="sm"
          centered
        >
          <CModalBody>
            <CForm onSubmit={handleSubmit}>
              <CModalHeader closeButton>
                Добавление нового сотрудника
              </CModalHeader>
              <CModalBody>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel htmlFor="first_name">Имя</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                          required
                          id="first_name"
                          value={values.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.first_name && touched.first_name
                              ? "border-error"
                              : ""
                          }
                        />
                        {
                          <span className="text-danger">
                            {errors.first_name &&
                              touched.first_name &&
                              errors.first_name}
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
                        <CLabel htmlFor="last_name">Фамилия</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                          required
                          id="last_name"
                          value={values.last_name}
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
                        <CLabel htmlFor="department">Отдел</CLabel>
                      </CCol>
                      <CCol xs="12">
                        {fetchDepartmentError ? (
                          <span className="text-danger">
                            {fetchDepartmentError}
                          </span>
                        ) : (
                          <Select
                            options={departments}
                            value={selectedDepartment}
                            onChange={(s) => setSelectedDepartment(s)}
                          />
                        )}
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel htmlFor="position">Должность</CLabel>
                      </CCol>
                      <CCol xs="12">
                      {fetchPositionsError ? (
                          <span className="text-danger">
                            {fetchPositionsError}
                          </span>
                        ) : (
                        <Select
                          id="position"
                          options={positions}
                          value={selectedPosition}
                          onChange={(s) => setSelectedPosition(s)}
                        />)}
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
                <CButton color="secondary" onClick={closeFormModal}>
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
  first_name: "",
  last_name: "",
};

export default EmployeeCreateModalForm;
