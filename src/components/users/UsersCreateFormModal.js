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
import Select from "react-select";

function UserCreateFormModal({
  isFormModalOpen,
  closeFormModal,
  setUsers,
  users,
  reFetchUsers,
}) {
  
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    selectedRole: "",
  });

  const saveUser = (e) => {
    setNewUser({
      first_name: e.target.form[1].value,
      last_name: e.target.form[2].value,
      role: setSelectedRole(selectedRole),
      username: e.target.form[4].value,
      password: e.target.form[5].value,

    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await PansionService.createUser(newUser);
    setUsers([...users, data]);
    closeFormModal();
    setNewUser({
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      role: "",
    });
    reFetchUsers();
  };

  return (
    <CModal show={isFormModalOpen} onClose={closeFormModal} size="sm" centered>
      <CModalBody>
        <CForm onSubmit={(e) => onSubmit(e)}>
          <CModalHeader closeButton>
            Добавление нового пользователя
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
                      onChange={(e) => saveUser(e)}
                      value={newUser.first_name}
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
                    <CLabel htmlFor="last_name">Фамилия</CLabel>
                  </CCol>
                  <CCol xs="12">
                    <CInput
                      required
                      id="last_name"
                      onChange={(e) => saveUser(e)}
                      value={newUser.last_name}
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
                    <CLabel htmlFor="role">Должность</CLabel>
                  </CCol>
                  <CCol xs="9">
                    <Select
                      options={roles}
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e)}
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
                      required
                      id="username"
                      onChange={(e) => saveUser(e)}
                      value={newUser.username}
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
                    <CLabel htmlFor="password">Пароль</CLabel>
                  </CCol>
                  <CCol xs="12">
                    <CInput
                      required
                      id="password"
                      onChange={(e) => saveUser(e)}
                      value={newUser.password}
                      type="password"
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
            <CButton color="secondary" onClick={closeFormModal}>
              Cancel
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  );
}

const roles = [
  { value: 0, label: "Администратор" },
  { value: 1, label: "Менеджер" },
  { value: 2, label: "Сотрудник" },

];

export default UserCreateFormModal;
