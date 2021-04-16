import React, { useContext, useCallback , useState} from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CRow, CCol
} from '@coreui/react'
import PansionServiceContext from '../../context/PansionServiceContext';


function EmployeeDeleteModal ({
    reFetchEmployees,
    closeDeleteConfirmModal,
    isDeleteConfirmModalOpen,
    selectedEmployee
}){
    const PansionService = useContext(PansionServiceContext)

    const [deleteError, setDeleteError] = useState(null)

    const onDelete = useCallback( async( id ) => {
        const { hasError, data } = await PansionService.deleteEmployee(id)
        if( hasError ) {
            setDeleteError(data.detail)
            console.log('что то пошло не так')
        }
        else{
            closeDeleteConfirmModal();
            reFetchEmployees();
        }
    },[])
    console.log('EmployeeID:', selectedEmployee.id);
    return(
        <CModal
            show={isDeleteConfirmModalOpen}
            onclose={closeDeleteConfirmModal}
            size="sm"
            centered
        >
            <CModalBody>
                Вы уверены, что хотите удалить этого сотрудника из списка?
            </CModalBody>
            <CModalFooter>
                <CRow>
                    <CButton
                        color="danger"
                        onClick={ () => onDelete(selectedEmployee.id)}
                    >               
                    Удалить         
                    </CButton>
                    <CButton
                        color="secondary"
                        onClick={ () => closeDeleteConfirmModal()}
                    >               
                    Отмена        
                    </CButton>
                </CRow>
                { deleteError && (
                    <CRow>
                        <CCol>
                            <span className='text-danger'>{deleteError}</span>
                        </CCol>
                    </CRow>
                )}
            </CModalFooter>
        </CModal>
    )
}
export default EmployeeDeleteModal;