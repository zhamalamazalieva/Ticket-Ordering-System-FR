import React, { useContext, useCallback , useState} from 'react'
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

    const [deleteError, setDeleteError] = useState(null)

    const onDelete = useCallback( async( id ) => {
        const { hasError, data } = await PansionService.deleteUser(id)
        if( hasError ) {
            setDeleteError(data.detail)
            console.log('что то пошло не так')
        }
        else{
            closeDeleteConfirmModal();
            reFetchUsers();
        }
    },[])
    console.log('userID:', selectedUser.id);
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
                        className="mr-2"
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
export default UsersDeleteModal;