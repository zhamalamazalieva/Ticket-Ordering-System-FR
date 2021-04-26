import React from "react";
import { CRow, CDataTable, CButton } from "@coreui/react";

function DepartmentTable({ departments, onClickEdit, onClickDelete }) {
  
  return (
    <>
      <CDataTable
        items={departments}
        fields={fields}
        hover
        striped
        bordered
        size="sm"
        sorter
        scopedSlots={{
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
      />
    </>
  );
}

const fields = [
    {
        key:'title',
        label:'Название отдела',
        _style: { width: "40%" },

        
    },
    {
        key:'description',
        label:'Описание отдела',
        _style: { width: "40%" },

    },
    {
        key: "actions",
        label: "",
    },
];

export default DepartmentTable;
