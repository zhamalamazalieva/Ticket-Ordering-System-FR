import {CRow, CCol, CDataTable, CButton} from '@coreui/react'
import React, { useEffect, useState, useContext } from 'react'
import PansionServiceContext from '../../context/PansionServiceContext'

function EmployeesTable ( {employees, onClickDelete, onClickEdit }) {
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
                    position:(item) => <td>{item.position}</td>,
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
export default EmployeesTable