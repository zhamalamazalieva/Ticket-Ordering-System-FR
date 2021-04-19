import React, { useContext, useEffect, useState, useCallback } from "react";
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
import { Formik } from "formik";
import Select from "react-select";

function EmployeeEditModalForm({
  isEditModalFormOpen,
  closeEditModalForm,
  reFetchEmployees,
  selectedEmployee,
}) {

  const PansionService = useContext(PansionServiceContext);

  const formValues = {
    first_name: selectedEmployee.first_name,
    last_name: selectedEmployee.last_name,
    department: selectedEmployee.department,
    position: selectedEmployee.position,
  };

  const [selectedPosition, setSelectedPosition] = useState(positions[0]);
  const [selectedDepartment, setSelectedDepartment] = useState({});

  const [departments, setDepartments] = useState([]);
  const [fetchDepartmentError, setFetchDepartmentError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDepartment =  async () => {
      setIsLoading(true)
      const { hasError, data } = await PansionService.getDepartment();

      if (hasError) {
        setFetchDepartmentError("Произошла ошибка при загрузке данных");
      } else {
        const dep = data.map((d) => ({ value: d.id, label: `${d.title}` }));
        setDepartments(dep);
      }
      return null;
    };
    fetchDepartment();
  }, [PansionService]);


  // useEffect(() => {
  //   const department = departments.find(dep => dep.value === selectedEmployee.department)

  //   if(typeof department !== 'undefined'){
  //     setSelectedDepartment(department)
  //   }
  // }, [departments, selectedEmployee.department])

  console.log(isLoading, " load")
  const onSubmit = async (values) => {
    setIsLoading(true);

    const { hasError, data } = await PansionService.updateEmployee({
      id:selectedEmployee.id,
      first_name:values.first_name,
      last_name:values.last_name,
      department:selectedDepartment.value,
      position:selectedPosition.value,
    });
  

    if (hasError) {
      console.log("Ошибка какая то:", hasError);
    } else {
      reFetchEmployees();
      closeEditModalForm();
    }
    setIsLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={formValues}
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          !values.first_name && (errors.first_name = "Обязательное поле");
          !values.last_name && (errors.first_name = "Обязательное поле");

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
          handleReset,
        }) => (
          <CModal
            show={isEditModalFormOpen}
            onClose={closeEditModalForm}
            size="x"
          >
            <CForm onSubmit={handleSubmit}>
              <CModalHeader closeButton>
                Изменить данные сотрудника
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
                          id="last_name"
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.last_name && touched.last_name
                              ? "border-error"
                              : ""
                          }
                        />
                        {
                          <span className="text-danger">
                            {errors.last_name &&
                              touched.last_name &&
                              errors.last_name}
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
                        <CLabel htmlFor="role">Отдел</CLabel>
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
                        <CLabel htmlFor="role">Должность</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <Select
                          options={positions}
                          value={selectedPosition}
                          onChange={(s) => setSelectedPosition(s)}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter className="d-flex justify-content-between">
                <div>
                  <CButton
                    color="info"
                    onClick={() => {
                      handleReset();
                    }}
                  >
                    Вернуть в исходное положение
                  </CButton>
                </div>
                <div>
                  {isLoading ? (
                    <span className="mr-5">
                      <MiniSpinner />
                    </span>
                  ) : (
                    <CButton color="primary" type="submit" className="mr-4">
                      Изменить
                    </CButton>
                  )} 
                  <CButton
                    color="secondary"
                    onClick={() => {
                      handleReset();
                      closeEditModalForm();
                    }}
                  >
                    Отмена
                  </CButton>
                </div>
              </CModalFooter>
            </CForm>
          </CModal>
        )}
      </Formik>
    </>
  );
}

const positions = [
  { value: 0, label: "Администратор" },
  { value: 1, label: "Менеджер" },
  { value: 2, label: "Сотрудник" },
];

export default EmployeeEditModalForm;
