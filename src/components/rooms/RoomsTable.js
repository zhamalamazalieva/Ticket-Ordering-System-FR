import React, { useEffect } from "react";
import { CRow, CCol, CDataTable, CButton, CBadge } from "@coreui/react";
import { Link } from "react-router-dom";

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

function RoomsTable({ rooms, onClickDelete, onClickEdit }) {
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
          number: (item) => <td>{item.title}</td>,
          seats: (item) => <td>{item.seats}</td>,
          category: (item) => <td>{item && item.category && item.category.title}</td>,
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          price: (item) => <td>{item.price}</td>,
          actions: (item) => (
            <td>
              <CRow className="d-flex justify-content-between m-width">
                  <CButton size="sm" color="info" className="ml-2">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/roomDetails/${item.id}`}
                    >
                      Посмотреть
                    </Link>
                  </CButton>
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() => onClickEdit(item)}
                    className="ml-2"
                  >
                    Изменить
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    onClick={() => onClickDelete(item)}
                    className="ml-2"
                  >
                    Удалить
                  </CButton>
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
    _style: { width: "30%" },
  },
  {
    key: "seats",
    label: "Количество мест",
    _style: { width: "15%" },
  },
  {
    key: "category",
    label: "Категория",
    _style: { width: "15%" },
  },
  {
    key: "price",
    label: "Цена",
    _style: { width: "15%" },
  },
  {
    key: "actions",
    label: "",
    _style: { width: "25%" },
  },
];

export default RoomsTable;
