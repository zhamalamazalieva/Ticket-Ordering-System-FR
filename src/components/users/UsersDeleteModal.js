import React, { useContext, useCallback } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CRow, CCol
} from '@coreui/react'
import PansionServiceContext from '../../context/PansionServiceContext';


function UsersDeleteModal ({
    reFetchUsers,
    closeDeleteConfirmModal,
    isDeleteConfirmModalOpen,
    selectedUser
}){
    const PansionService = useContext(PansionServiceContext)
    const onDelete = useCallback( async( id ) => {
        const { hasError, data } = await PansionService.deleteUser(id)
        if( hasError ) {
        }
        else{
            closeDeleteConfirmModal();
            reFetchUsers();
        }
    },[])

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
                        onClick={ () => onDelete(selectedUser.id)}
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
            </CModalFooter>
        </CModal>
    )
}
export default UsersDeleteModal;