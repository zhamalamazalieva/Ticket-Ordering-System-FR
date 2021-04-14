import {CRow, CCol, CDataTable, CButton} from '@coreui/react'
import React, { useEffect } from 'react'


function UsersTable ( {users, onDeleteClick }) {
    useEffect(() => {
        console.log(users)
    }, [])
    

    return(
        <>
            <CDataTable
                items={users}
                fields={fields}
                hover
                striped
                bordered
                six="sm"
                sorter
                scopedSlots={{
                    username: (item) => <td>{item.username}</td>,
                    firstname:(item) => <td>{item.firstname}</td>,
                    lastname:(item) => <td>{item.lastname}</td>,
                    role:(item) => <td>{item.role}</td>,
                    actions: (item) => (
                        <td>
                            <CRow>
                                <CCol>
                                    <CButton 
                                        size="sm"
                                        color="info"
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
                    )
                }}
            >
            </CDataTable>
        </>
    )
}
const fields = [
    {
        key:'username',
        label:'Аккаунт'
    },
    {
        key:'firstname',
        label:'Имя'
    },
    {
        key:'lastname',
        label:'Фамилия'
    },
    {
        key:'role',
        label:'Должность'
    },
    {
        key:'actions',
        label:'',
        _style:{ width: "20%"}
    }

]
export default UsersTable