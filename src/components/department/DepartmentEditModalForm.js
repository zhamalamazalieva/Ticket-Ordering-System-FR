import React, {useState, useContext} from 'react'
import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CButton,
    CCol,
    CRow,
    CFormGroup,
    CInput,
    CLabel,
    CForm
} from '@coreui/react'
import PansionServiceContext from "../../context/PansionServiceContext"
import { Formik } from "formik"
import MiniSpinner from "../spinners/MiniSpinner"

function DepartmentEditModalForm({ isFormModalOpen, closeFormModal, openFormModal, reFetchDepartment, selectedDepartment }) {

    const formValues = { depName: selectedDepartment.depName }

    const PansionService = useContext(PansionServiceContext)

    const [isLoading, setIsLoading] = useState(false)
    const [editError, setEditError] = useState(null)

    const onSubmit = async values => {
        setEditError(null)
        setIsLoading(true)

        const { hasError, data } = await PansionService.updateDepartment( selectedDepartment.id, values.depName )

        if (hasError){
            setEditError((data && data.detail) || 'Что-то пошло не так!')
        } else {
            reFetchDepartment()
            closeFormModal()
        }

        setIsLoading(false)
    }

    return (
        <>
            <CModal
                show={isFormModalOpen}
                onClose={closeFormModal}
                size="sm"
                centered
            >
                <Formik initialValues={formValues} onSubmit={onSubmit} validate={values => {
                    const errors = {}
                    !values.depName && (errors.depName = 'Обязательное поле')
                    return errors
                }}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <CForm onSubmit={handleSubmit}>
                            <CModalHeader closeButton>Изменение филиала</CModalHeader>
                            <CModalBody>
                                <CRow>
                                    <CCol>
                                        <CFormGroup row>
                                            <CCol xs="3">
                                                <CLabel htmlFor="city">Отдел</CLabel>
                                            </CCol>
                                            <CCol xs="9">
                                                <CInput
                                                    id="city"
                                                    value={values.depName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.depName && touched.depName? 'border-error' : ''}
                                                />
                                                { <span className="text-danger">{errors.depName && touched.depName && errors.depName}</span> }
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                { editError && <CRow>
                                    <CCol>
                                        <span className="text-danger">{ editError }</span>
                                    </CCol>
                                </CRow> }
                            </CModalBody>
                            <CModalFooter>
                                { isLoading ?
                                    <div className="mr-5">...</div> :
                                    <CButton color="primary" type="submit">
                                        Изменить
                                    </CButton> }
                                <CButton
                                    color="secondary"
                                    onClick={closeFormModal}
                                >Cancel</CButton>
                            </CModalFooter>
                        </CForm>
                    )}
                </Formik>
            </CModal>
        </>
    )
}

export default DepartmentEditModalForm
