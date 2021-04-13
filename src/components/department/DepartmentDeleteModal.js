import React, { useCallback, useContext, useState } from 'react'
import {CButton, CModal, CModalBody, CModalFooter, CRow, CCol} from "@coreui/react"
import PansionServiceContext from "../../context/PansionServiceContext"

function DepartmentDeleteModal({ isDeleteConfirmModalOpen, closeDeleteConfirmModal, selectedDepartment, reFetchDepartment }) {

    const PansionService = useContext(PansionServiceContext)

    const [deleteError, setDeleteError] = useState(null)

    const onDelete = useCallback(async id => {
        const { hasError, data } = await PansionService.deleteDepartment(id)

        if (hasError){
            setDeleteError(data.detail)
        } else {
            closeDeleteConfirmModal()
            reFetchDepartment()
        }
    }, [])


    return (
        <CModal
            show={isDeleteConfirmModalOpen}
            onClose={closeDeleteConfirmModal}
            size="sm"
            centered
        >
            {/*<CModalHeader closeButton>Are you sure to fucking out?</CModalHeader>*/}
            <CModalBody>
                Вы уверены что хотите удалить этот отдел из списка ?
            </CModalBody>
            <CModalFooter>
                <CRow>
                    <CButton
                        color="danger"
                        onClick={() => onDelete(selectedDepartment.id)}
                        className="mr-2"
                    >
                        Удалить
                    </CButton>
                    <CButton
                        color="secondary"
                        onClick={() => closeDeleteConfirmModal()}
                    >Отмена</CButton>
                </CRow>
                { deleteError && <CRow>
                    <CCol>
                        <span className="text-danger">{ deleteError }</span>
                    </CCol>
                </CRow> }
            </CModalFooter>
        </CModal>
    );
}

export default DepartmentDeleteModal;
