import React, { useState, useEffect } from "react";
import { CRow, CCol, CDataTable, CButton } from "@coreui/react";

function DepartmentTable({ departments, onEditClick, onDeleteClick }) {
  
  useEffect(() => {
    console.log(departments);
  }, []);

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
                    onClick={() => onDeleteClick(item)}
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
        key:'title',
        label:'Название отдела'
    },
    {
        key:'description',
        label:'Описание отдела'
    },
    {
        key: "actions",
        label: "",
        _style: { width: "35%" },
    },
];

export default DepartmentTable;
