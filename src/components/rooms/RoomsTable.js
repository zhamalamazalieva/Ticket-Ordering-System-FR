import React from "react";
import { CRow, CCol, CDataTable, CButton, CBadge } from "@coreui/react";


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
        items={rooms}
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
          category: (item) => <td>{item.category}</td>,
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          price: (item) => <td>{item.price}</td>,
          size: (item) => <td>{item.size}</td>,
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
    key: "price",
    label: "Цена",
  },
  {
    key: "size",
    label: "Размер",
  },
  {
    key: "actions",
    label: "",
    // _style: { width: '30%' },
  },
];

export default RoomsTable;
