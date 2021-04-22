import React, { useContext, useEffect, useState } from "react";
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

function UserEditModalForm({
  isFormModalOpen,
  closeFormModal,
  reFetchUsers,
  selectedUser,
}) {
  const PansionService = useContext(PansionServiceContext);

  const formValues = {
    username: selectedUser.username,
    password: "",
    confirmPassword: "",
    last_name: selectedUser.last_name,
    first_name: selectedUser.first_name,
    role: selectedUser.role,
  };

  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({ username: null, password: null });

  const onSubmit = async (values) => {
    setIsLoading(true);

    const { hasError, data } = await PansionService.updateUser({
      id: selectedUser.id,
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      role: selectedUser.role,
    });
    console.log("hasError:", hasError);
    console.log("data:", data);

    if (hasError) {
      setErr({
        username: (data && data.username && data.username[0]) || null,
        password: (data && data.password && data.password[0]) || null,
      });
    } else {
      reFetchUsers();
      closeFormModal();
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

          if (!values.username) {
            errors.username = "Обязательное поле";
            //   } else if (
            //     !/^[A-Z0-9._%+-]$/i.test(values.username)
            //   ) {
            // errors.username = 'Некорректный аккаунт';
          }

          if (values.password && values.password !== values.confirmPassword) {
            errors.confirmPassword = "Пароли не совпадают";
          }

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
          <CModal show={isFormModalOpen} onClose={closeFormModal}>
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
                        <CLabel htmlFor="role">Должность</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <Select
                          options={roles}
                          value={selectedRole}
                          onChange={(s) => setSelectedRole(s)}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel htmlFor="username">Аккаунт</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                          id="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.username && touched.username
                              ? "border-error"
                              : ""
                          }
                        />
                        {
                          <span className="text-danger">
                            {errors.username &&
                              touched.username &&
                              errors.username}
                          </span>
                        }
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  {/* <CCol>
                                        <CFormGroup row>
                                            <CCol xs='12'>
                                                <CLabel htmlFor="username">Пароль</CLabel>
                                            </CCol>
                                            <CCol xs="12">
                                                <CInput
                                                    id="password"
                                                    type="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={( errors.password && touched.password) ? 'border-error' : '' }
                                                />
                                                {<span className="text-danger">{ errors.password && touched.password && errors.password}</span>}
                                            </CCol>
                                        </CFormGroup>
                                    </CCol> */}
                </CRow>
                {/* <CRow>
                                    <CCol>
                                        <CFormGroup row>
                                            <CCol xs='12'>
                                                <CLabel htmlFor="username">Подтверждение пароля</CLabel>
                                            </CCol>
                                            <CCol xs="6">
                                                <CInput
                                                    id="confirmPassword"
                                                    type="password"
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={( errors.confirmPassword && touched.confirmPassword) ? 'border-error' : '' }
                                                />
                                                {<span className="text-danger">{ errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span>}
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CRow> */}
              </CModalBody>
              <CModalFooter className="d-flex justify-content-between">
                <div>
                  <CButton
                    color="info"
                    onClick={() => {
                      setErr({ username: null, password: null });
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
                      closeFormModal();
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

const roles = [
  { value: 0, label: "Администратор" },
  { value: 1, label: "Менеджер" },
  { value: 2, label: "Сотрудник" },
];

export default UserEditModalForm;
