import React from "react";
import { CRow, CCol, CDataTable, CButton, CBadge } from "@coreui/react";
import roomsData from "./roomsData";
const getBadge = (status) => {
  switch (status) {
    case "Пустой":
      return "success";
    case "Забронирован":
      return "warning";
    default:
      return "success";
  }
};

function RoomsTable({ rooms, onEditClick }) {
  return (
    <>
      <CDataTable
        items={roomsData}
        fields={fields}
        hover
        striped
        bordered
        size="sm"
        sorter
        scopedSlots={{
          number: (item) => <td>{item.name}</td>,
          description: (item) => <td>{item.description}</td>,
          seats: (item) => <td>{item.seats}</td>,
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          category: (item) => <td>{item.category}</td>,
          price1: (item) => <td>{item.price}</td>,
          price2: (item) => <td>{item.price}</td>,

          actions: (item) => (
            <td>
              <CRow>
                <CCol>
                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => onEditClick(item)}
                  >
                    Изменить
                  </CButton>
                </CCol>
                <CCol>
                  <CButton
                    size="sm"
                    color="danger"
                  >
                    Удалить
                  </CButton>
                </CCol>
              </CRow>
            </td>
          ),
        }}
      />
    </>
  );
}

const fields = [
  {
    key: "number",
    label: "Номер",
  },
  {
    key: "description",
    label: "Описание",
  },
  {
    key: "seats",
    label: "Количество мест",
  },
  {
    key: "category",
    label: "Категория",
  },
  {
    key: "price1",
    label: "Цена льгот.",
  },
  {
    key: "price2",
    label: "Цена коммр.",
  },
  {
    key: "actions",
    label: "",
    // _style: { width: '30%' },
  },
];

export default RoomsTable;
