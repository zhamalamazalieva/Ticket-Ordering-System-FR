import React from 'react'
import {
    CRow,
    CCol,
    CDataTable,
    CButton,
    CBadge
} from '@coreui/react'
import roomsData from './roomsData'
const getBadge = status => {
    switch (status) {
      case 'Пустой': return 'success'
      case 'Забронирован': return 'warning'
      default: return 'success'
    }
  }

function RoomsTable({ rooms, onEditClick, onDeleteClick }) {

 
    return (
        <>
            <CDataTable
                items={roomsData}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                sorter
                scopedSlots = {{
                    'Список номеров':
                        (item)=>(
                            <td>
                                { item.depName }
                            </td>
                        ),
                    'Количество мест':
                        (item)=>(
                            <td>
                                { item.place }
                            </td>
                        ),
                   'Статус':
                              (item)=>(
                                <td>
                                  <CBadge color={getBadge(item.status)}>
                                    {item.status}
                                  </CBadge>
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

const fields = ['Список номеров', 'Количество мест', 'Статус', {
    key: 'actions',
    label: '',
    _style: { width: '30%' },
}]

export default RoomsTable