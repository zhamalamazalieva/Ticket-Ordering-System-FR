import React from 'react'
import {
    CRow,
    CCol,
    CDataTable,
    CButton
} from '@coreui/react'
import usersData from './userData'

function DepartmentTable({ department, onEditClick, onDeleteClick }) {

    return (
        <>
            <CDataTable
                items={usersData}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                sorter
                columnFilter
                scopedSlots = {{
                    'Список отделов':
                        (item)=>(
                            <td>
                                { item.depName }
                            </td>
                        ),
                    'actions':
                        (item)=>(
                            <td>
                                <CRow>
                                    <CCol>
                                        <CButton size="sm" color="info" onClick={() => onEditClick(item)}>Изменить</CButton>
                                    </CCol>
                                    <CCol>
                                        <CButton size="sm" color="danger" onClick={() => onDeleteClick(item)}>Удалить</CButton>
                                    </CCol>
                                </CRow>
                            </td>
                        )
                }}
            />
        </>
    )
}

const fields = ['Список отделов', {
    key: 'actions',
    label: '',
    _style: { width: '35%' },
}]

export default DepartmentTable
