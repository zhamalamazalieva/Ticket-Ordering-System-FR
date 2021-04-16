import React, { useState, useContext} from 'react'
import {   CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CButton,
    CCol,
    CRow,
    CFormGroup,
    CInput,
    CLabel,
    CForm } from '@coreui/react'
import PansionServiceContext from '../../context/PansionServiceContext'
import MiniSpinner from '../spinners/MiniSpinner'

function EmployeeCreateFormModal({
    isFormModalOpen,
    closeFormModal,
    setEmployees,
    employees,
    reFetchEmployees}
){

    const [isLoading, setIsLoading] = useState(false)
    const [createError, setCreateError] = useState(null)

    const PansionService  = useContext(PansionServiceContext)

    const [ newEmployee, setNewEmployee] = useState({
        first_name:'',
        last_name:'',
        department:'',
        position:''
    })

    const saveEmployee = ( e ) => {
        setNewEmployee({
            first_name: e.target.form[1].value,
            last_name: e.target.form[2].value,
            department: e.target.form[3].value,
            position: e.target.form[4].value
        })        
    }

    const onSubmit = async ( e ) => {
        e.preventDefault()
        const { data } = await PansionService.createEmployee(
            newEmployee
        ) 
        setEmployees([...employees, data ])
        closeFormModal()
        setNewEmployee({
            first_name:'',
            last_name:'',
            department:'',
            position:''
        })
        // reFetchEmployees()
        console.log('emplooooyoee:', employees);
    }


  return(
    <CModal
    show={isFormModalOpen}
    onClose={closeFormModal}
    size="sm"
    centered
    >
    <CModalBody>
       <CForm onSubmit={(e) => onSubmit(e)}>
            <CModalHeader closeButton>
                Добавление нового сотрудника
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol>
                        <CFormGroup row>
                            <CCol xs="12">
                                <CLabel htmlFor='first_name'>Имя</CLabel>
                            </CCol>
                            <CCol xs="12">
                                <CInput
                                required
                                id='first_name'
                                onChange={(e) => saveEmployee(e)}
                                value={newEmployee.first_name}
                                type="text"                                    
                                />
                            </CCol>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CFormGroup row>
                            <CCol xs="12">
                                <CLabel htmlFor='last_name'>Фамилия</CLabel>
                            </CCol>
                            <CCol xs="12">
                                <CInput
                                required
                                id='last_name'
                                onChange={(e) => saveEmployee(e)}
                                value={newEmployee.last_name}
                                type="text"                                    
                                />
                            </CCol>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CFormGroup row>
                            <CCol xs="12">
                                <CLabel htmlFor='department'>Отдел</CLabel>
                            </CCol>
                            <CCol xs="12">
                                <CInput
                                required
                                id='department'
                                onChange={(e) => saveEmployee(e)}
                                value={newEmployee.department}
                                type="number"                                    
                                />
                            </CCol>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CFormGroup row>
                            <CCol xs="12">
                                <CLabel htmlFor='position'>Должность</CLabel>
                            </CCol>
                            <CCol xs="12">
                                <CInput
                                required
                                id='position'
                                onChange={(e) => saveEmployee(e)}
                                value={newEmployee.position}
                                type="number"                                    
                                />
                            </CCol>
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                {
                    isLoading ? (
                        <div className="mr-5">
                        <MiniSpinner/>
                    </div>
                    ):(
                        <CButton color="primary" type="submit">
                        Добавить
                        </CButton>
                    )
                }
                <CButton color="secondary" onClick={closeFormModal}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CForm>
    </CModalBody>
</CModal>
  )

}

export default EmployeeCreateFormModal