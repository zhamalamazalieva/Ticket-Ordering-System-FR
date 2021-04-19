import {CRow, CCol, CDataTable, CButton} from '@coreui/react'
import React, { useEffect } from 'react'


function EmployeesTable ( {employees, onClickDelete, onClickEdit }) {

    useEffect(() => {
        console.log(employees)
    }, [])    

    return(
        <>
            <CDataTable
                items={employees}
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
                    position:(item) => <td>{EmployeesPositions[item.position]}</td>,
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
   
]
const EmployeesPositions = {
    0:"Админ",
    1:"Менеджер",
    2:"Сотрудник"
}
export default EmployeesTable