import React, { useEffect} from "react";
import { CRow, CCol, CDataTable, CButton, CBadge } from "@coreui/react";
import { Link } from 'react-router-dom'


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

function RoomsTable({ rooms, onClickDelete, selectedRoom }) {

  useEffect(() => {
    console.log(rooms);
  }, []);


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
          category: (item) => <td>{item.category}</td>,
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          price: (item) => <td>{item.price}</td>,
          actions: (item) => (
            <td>
              <CRow>
              <CCol>
                  <CButton
                    size="sm"
                    color="info"
                  >
                    <Link style={{ textDecoration: 'none', color:'white' }} to={`/roomDetails/${item.id}`}>
                        Посмотреть
                    </Link>
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
    key: "actions",
    label: "",
  },
];

export default RoomsTable;
