import { CRow, CCol, CDataTable, CButton } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";

function CategoriesTable({ categories, onClickDelete, onClickEdit }) {
  return (
    <>
      <CDataTable
        items={categories}
        fields={fields}
        hover
        striped
        bordered
        six="sm"
        sorter
        scopedSlots={{
          title: (item) => <td>{item.title}</td>,
          description: (item) => <td>{item.description}</td>,
          actions: (item) => (
            <td>
              <CRow>
                <CButton
                  className="ml-2"
                  size="sm"
                  color="info"
                  onClick={() => onClickEdit(item)}
                >
                  <Link
                    to={`/categories/${item.id}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Список номеров
                  </Link>
                </CButton>
                <CButton
                  className="ml-2"
                  size="sm"
                  color="primary"
                  onClick={() => onClickEdit(item)}
                >
                  Изменить
                </CButton>
                <CButton
                  className="ml-2"
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
    key: "title",
    label: "Категория номеров",
  },
  {
    key: "description",
    label: "Описание",
  },
  {
    key: "actions",
    label: "",
    _style: { width: "30%" },
  },
];

export default CategoriesTable;
