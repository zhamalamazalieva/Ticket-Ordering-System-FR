import React, { useEffect, useCallback, useState, useContext } from "react";
import { CRow, CCol, CDataTable, CButton, CBadge,
  CCard,
  CCardBody,
  CCardHeader} from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import PansionServiceContext from "src/context/PansionServiceContext";


function RoomsByCategoryId({}) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState([]);

  const onClickDelete = () => {};
  const onClickEdit = () => {};

  const { positionId } = useParams();
  console.log(positionId);

  const fetchRoomsByCategory = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await PansionService.getEmployeesByPositionId(
       positionId
    );
    if (hasError) {
      console.log("Ошибка с сервером: ", hasError);
    } else {
      setPosition(data);
    }
    setIsLoading(false);
    return null;
  }, []);

  useEffect(() => {
    fetchRoomsByCategory();
  }, [positionId]);

  return (
    <>
          <CCard>
            <CCardHeader>
            <h5>{position.title}</h5>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                items={position.employees}
                fields={fields}
                hover
                striped
                bordered
                six="sm"
                sorter
                scopedSlots={{
                    first_name:(item) => <td>{item.first_name}</td>,
                    last_name:(item) => <td>{item.last_name}</td>,
                    department:(item) => <td>{item.department}</td>,
                    position:(item) => <td>{item.positionId}</td>,
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
            )
        }}
    >
    </CDataTable>
    </CCardBody>
    </CCard>
</>
)
}
const fields = [
{
key:'first_name',
label:'Имя'
},
{
key:'last_name',
label:'Фамилия'
},
{
key:'department',
label:'Отдел'
},
{
key:'position',
label:'Должность'
},
{
key:'actions',
label:'',
_style:{ width: "20%"}
}
];

export default RoomsByCategoryId;
