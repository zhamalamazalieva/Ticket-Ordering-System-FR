import React, { useContext, useCallback , useState} from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CRow, CCol
} from '@coreui/react'
import PansionServiceContext from '../../context/PansionServiceContext';
import MiniSpinner from '../spinners/MiniSpinner';


function PositionDeleteModalForm ({
    reFetchPositions,
    selectedPosition,
    closeDeleteModalForm,
    isDeleteModalFormOpen,
}){
    const PansionService = useContext(PansionServiceContext)

    const [isLoading, setIsLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    const onDelete = useCallback( async( id ) => {
        setIsLoading(true)

        const { hasError, data } = await PansionService.deletePosition(id)
        if( hasError ) {
            console.log(selectedPosition.id)
            setDeleteError('Не удалось удалить этого сотрудника', hasError)
        }
        else{
            reFetchPositions();
            closeDeleteModalForm();

        }
        setIsLoading(false)
    },[])


    return(
        <CModal
            show={isDeleteModalFormOpen}
            onclose={closeDeleteModalForm}
            size="sm"
            centered
        >
            <CModalBody>
                Вы уверены, что хотите удалить эту должность из списка?
            </CModalBody>
            <CModalFooter>
                <CRow>
                    { isLoading ? <span><MiniSpinner/></span>:
                         <CButton
                         color="danger"
                         onClick={() => onDelete(selectedPosition.id)}
                        className="mr-2"
                     >               
                     Удалить         
                     </CButton>
                    }
               
                    <CButton
                        color="secondary"
                        onClick={ () => closeDeleteModalForm()}
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
export default PositionDeleteModalForm;