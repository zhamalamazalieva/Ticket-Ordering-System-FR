import React, { useContext, useCallback , useState} from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CRow, CCol
} from '@coreui/react'
import PansionServiceContext from '../../context/PansionServiceContext';
import MiniSpinner from '../spinners/MiniSpinner';


function EmployeeDeleteModal ({
    reFetchEmployees,
    closeDeleteConfirmModal,
    isDeleteConfirmModalOpen,
    selectedEmployee
}){
    const PansionService = useContext(PansionServiceContext)

    const [isLoading, setIsLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    const onDelete = useCallback( async( id ) => {
        setIsLoading(true)

        const { hasError, data } = await PansionService.deleteEmployees(id)
        if( hasError ) {
            setDeleteError('Не удалось удалить этого сотрудника')
        }
        else{
            closeDeleteConfirmModal();
            reFetchEmployees();
        }
        setIsLoading(false)
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
                    { isLoading ? <span><MiniSpinner/></span>:
                         <CButton
                         color="danger"
                         onClick={ () => onDelete(selectedEmployee.id)}
                     >               
                     Удалить         
                     </CButton>
                    }
               
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