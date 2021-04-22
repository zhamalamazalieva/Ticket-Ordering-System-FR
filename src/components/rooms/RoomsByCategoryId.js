import React, { useEffect, useCallback, useState, useContext } from "react";
import {
  CRow,
  CCol,
  CDataTable,
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import PansionServiceContext from "src/context/PansionServiceContext";

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

function RoomsByCategoryId({}) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const onClickDelete = () => {};
  const onClickEdit = () => {};

  const { categoryId } = useParams();
  console.log(categoryId);

  const fetchRoomsByCategory = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await PansionService.getRoomsByCategoryId(
      categoryId
    );
    if (hasError) {
      console.log("Ошибка с сервером: ", hasError);
    } else {
      setCategory(data);
    }
    setIsLoading(false);
    return null;
  }, []);

  useEffect(() => {
    fetchRoomsByCategory();
  }, [categoryId]);

  return (
    <>
      <CCard>
        <CCardHeader>
          <h5>{category.title}</h5>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={category.rooms}
            fields={fields}
            hover
            striped
            bordered
            size="sm"
            sorter
            scopedSlots={{
              number: (item) => <td>{item.title}</td>,
              seats: (item) => <td>{item.seats}</td>,
              category: (item) => <td>{item.categoryId}</td>,
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
                      <CButton size="sm" color="success">
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={`/roomDetails/${item.id}`}
                        >
                          Посмотреть
                        </Link>
                      </CButton>
                    </CCol>
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
          />
        </CCardBody>
      </CCard>
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
    _style: { width: "30%" },
  },
];

export default RoomsByCategoryId;
