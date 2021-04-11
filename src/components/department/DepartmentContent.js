import React, {useState, useContext, useCallback, useEffect} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol, CModal, CModalBody, CModalFooter,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DepartmentTable from "./DepartmentTable"
import DepartmentCreateModalForm from "./DepartmentCreateModalForm"
import PansionServiceContext from "../../context/PansionServiceContext"
import FullPageSpinner from "../spinners/FullPageSpinner"
import DepartmentEditModalForm from "./DepartmentEditModalForm"
import DepartmentDeleteModal from "./DepartmentDeleteModal";

function DepartmentContent(props) {

    const PansionService = useContext(PansionServiceContext)

    const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false)
    const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false)
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [department, setDepartment] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState(null)

    const fetchDepartment = useCallback(async () => {
        setIsLoading(true)
        const { hasError, data } = await PansionService.getDepartment()

        console.log('Department result', data)
        if (hasError){

        } else {
            setDepartment(data)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => { fetchDepartment() }, [])

    const reFetchDepartment = useCallback(() => fetchDepartment(), [])

    const openCreateFormModal = useCallback(() => setIsCreateFormModalOpen(true), [])

    const closeCreateFormModal = useCallback(() => setIsCreateFormModalOpen(false), [])

    const openEditFormModal = useCallback(() => setIsEditFormModalOpen(true), [])

    const closeEditFormModal = useCallback(() => setIsEditFormModalOpen(false), [])

    const openDeleteConfirmModal = useCallback(() => setIsDeleteConfirmModalOpen(true), [])

    const closeDeleteConfirmModal = useCallback(() => setIsDeleteConfirmModalOpen(false), [])

    const onEditClick = useCallback(department => {
        setSelectedDepartment(department)
        openEditFormModal()
    }, [])

    const onDeleteClick = useCallback(department => {
        setSelectedDepartment(department)
        openDeleteConfirmModal()
    }, [])

    return (
        <>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol>
                            Управление отделами
                        </CCol>
                        <CCol>
                            <CButton color="primary" className="float-right" onClick={openCreateFormModal}>
                                <span className="mr-3">Добавить отдел</span>
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    { isLoading ? <FullPageSpinner /> : <DepartmentTable
                        department={department}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                    /> }
                </CCardBody>
            </CCard>
            <DepartmentCreateModalForm
                isFormModalOpen={isCreateFormModalOpen}
                openFormModal={openCreateFormModal}
                closeFormModal={closeCreateFormModal}
                reFetchDepartment={reFetchDepartment}
            />
            { selectedDepartment && <DepartmentEditModalForm
                isFormModalOpen={isEditFormModalOpen}
                openFormModal={openEditFormModal}
                closeFormModal={closeEditFormModal}
                reFetchDepartment={reFetchDepartment}
                selectedDepartment={selectedDepartment}
            /> }
            { selectedDepartment && <DepartmentDeleteModal
                isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
                closeDeleteConfirmModal={closeDeleteConfirmModal}
                selectedDepartment={selectedDepartment}
                reFetchDepartment={reFetchDepartment}
            /> }
        </>
    )
}

export default DepartmentContent
