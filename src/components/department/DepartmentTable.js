import React, { useState, useEffect} from 'react'
import {
    CRow,
    CCol,
    CDataTable,
    CButton
} from '@coreui/react'

function DepartmentTable({ department, onEditClick, onDeleteClick }) {

    return (
        <>
            <CDataTable
                items={department}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                sorter
                scopedSlots = {{
                    'Список отделов':
                        (item)=>(
                            <td>
                                { item.depName }
                            </td>
                        ),
                    'Описание':
                        (item)=>(
                            <td>
                                { item.description }
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

const fields = ['Список отделов', ' Описание', {
    key: 'actions',
    label: '',
    _style: { width: '35%' },
}]

export default DepartmentTable
