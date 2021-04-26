import {CRow, CCol, CDataTable, CButton} from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function PositionsTable ( {positions, onClickDelete, onClickEdit}) {
    return(
        <>
            <CDataTable
                items={positions}
                fields={fields}
                hover
                striped
                bordered
                six="sm"
                sorter
                scopedSlots={{
                    title:(item) => <td>{item.title}</td>,
                    description:(item) => <td>{item.description}</td>,
                    actions: (item) => (
                        <td>
                            <CRow className="m-width d-flex justify-content-between">
                                     <CButton 
                                        size="sm"
                                        color="info"
                                        onClick={() => onClickEdit(item)}
                                        className="ml-2"
                                    >
                                        <Link
                                             to={`/positions/${item.id}`}
                                             style={{ textDecoration: "none", color: "white" }}
                                        >
                                             Список сотрудников
                                  </Link>
                                    </CButton> 
                                    <CButton 
                                        size="sm"
                                        color="primary"
                                        onClick={() => onClickEdit(item)}
                                        className="ml-2"
                                    >
                                        Изменить
                                    </CButton> 
                                    <CButton 
                                        size="sm"
                                        color="danger"
                                        onClick={() => onClickDelete(item)}
                                        className="ml-2"
                                    >
                                        Удалить
                                    </CButton>
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
        key:'title',
        label:'Должность',
        _style:{ width: "32%"}

    },
    {
        key:'description',
        label:'Описание',
        _style:{ width: "32%"}

    },
    {
        key:'actions',
        label:'',
    }
   
]

export default PositionsTable