import { CRow, CDataTable, CButton } from "@coreui/react";
import React from "react";

function FlowsTable({ flows, onClickDelete, onClickEdit }) {
  return (
    <>
      <CDataTable
        items={flows}
        fields={fields}
        hover
        striped
        bordered
        six="sm"
        sorter
        scopedSlots={{
          start_date: (item) => <td>{item.start_date}</td>,
          end_date: (item) => <td>{item.end_date}</td>,
          title: (item) => <td>{item.title}</td>,
          description: (item) => <td>{item.description}</td>,
          actions: (item) => (
            <td>
              <CRow className="m-width d-flex justify-content-between">
                <CButton
                  size="sm"
                  color="info"
                  onClick={() => onClickEdit(item)}
                >
                  Изменить
                </CButton>
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => onClickDelete(item)}
                >
                  Удалить
                </CButton>
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
    key: "start_date",
    label: "Начало потока",
    _style: { width: "20%" },
  },
  {
    key: "end_date",
    label: "Конец потока",
    _style: { width: "20%" },
  },
  {
    key: "title",
    label: "Поток №",
    _style: { width: "15%" },
  },
  {
    key: "description",
    label: "Описание",
    _style: { width: "25%" },
  },
  {
    key: "actions",
    label: "",
  },
];

export default FlowsTable;
