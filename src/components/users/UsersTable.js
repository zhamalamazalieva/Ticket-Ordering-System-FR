import { CRow, CCol, CDataTable, CButton } from "@coreui/react";
import React, { useEffect } from "react";

function UsersTable({ users, onClickDelete, onClickEdit }) {
  useEffect(() => {
    console.log(users);
  }, []);

  return (
    <>
      <CDataTable
        items={users}
        fields={fields}
        hover
        striped
        bordered
        six="sm"
        sorter
        scopedSlots={{
          first_name: (item) => <td>{item.first_name}</td>,
          last_name: (item) => <td>{item.last_name}</td>,
          role: (item) => <td>{userRoles[item.role]}</td>,
          username: (item) => <td>{item.username}</td>,
          password: (item) => <td>{item.password}</td>,
          actions: (item) => (
            <td>
              <CRow>
                <CCol>
                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => onClickEdit(item)}
                  >
                    Изменить
                  </CButton>
                </CCol>
                <CCol>
                  <CButton
                    size="sm"
                    color="danger"
                    onClick={() => onClickDelete(item)}
                  >
                    Удалить
                  </CButton>
                </CCol>
              </CRow>
            </td>
          ),
        }}
      ></CDataTable>
    </>
  );
}
const fields = [
  {
    key: "first_name",
    label: "Имя",
  },
  {
    key: "last_name",
    label: "Фамилия",
  },
  {
    key: "role",
    label: "Должность",
  },
  {
    key: "username",
    label: "Аккаунт",
    filter: false,
    sorter: false,
  },
  {
    key: "password",
    label: "Пароль",
    filter: false,
    sorter: false,
  },

  {
    key: "actions",
    label: "",
    _style: { width: "20%" },
  },
];
const userRoles = {
  0: "Админ",
  1: "Менеджер",
  2: "Сотрудник",
};
export default UsersTable;
