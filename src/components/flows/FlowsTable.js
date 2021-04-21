import {CRow, CCol, CDataTable, CButton} from '@coreui/react'
import React from 'react'


function FlowsTable ( {flows, onClickDelete, onClickEdit}) {
    return(
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
                    start_date:(item) => <td>{item.start_date}</td>,
                    end_date:(item) => <td>{item.end_date}</td>,
                    title:(item) => <td>{item.title}</td>,
                    description:(item) => <td>{item.description}</td>,
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
        key:'start_date',
        label:'Начало потока'
    },
    {
        key:'end_date',
        label:'Конец потока'
    },
    {
        key:'title',
        label:'Поток №'
    },
    {
        key:'description',
        label:'Описание'
    },
    {
        key:'actions',
        label:'',
        _style:{ width: "20%"}
    }
   
]

export default FlowsTable