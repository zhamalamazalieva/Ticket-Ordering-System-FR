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
    CForm,
  } from "@coreui/react";
  import React, {useContext, useState, useCallback} from 'react'
  import MiniSpinner from "../spinners/MiniSpinner";
  import PansionServiceContext from "../../context/PansionServiceContext";
  import { Formik } from "formik";

function PositionEditModalForm ({
    isEditModalFormOpen,
    closeEditModalForm,
    reFetchPositions,
    selectedPosition
}){

    const formValues = {
        title:selectedPosition.title,
        description: selectedPosition.description
    }

    const PansionSevice = useContext(PansionServiceContext)

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async( values ) => {
        setIsLoading(true)
        const { hasError, data } = await PansionSevice.updatePosition({
            id: selectedPosition.id,
            title: values.title,
            description: values.description
        }) 
        if( hasError ){
            console.log('Ошибка про запросе: ', hasError)
        }
        else{
            reFetchPositions()
            closeEditModalForm()
        }
        setIsLoading(false)
    }

    return(
        <>
        <Formik
            initialValues={formValues}
            onSubmit={onSubmit}
            validate={( values ) => {
                const errors = {}
                !values.title && (errors.title = 'Обязательное поле')
                return errors
            }}
        >
            {({
                values,
                errors, 
                touched,
                handleReset,
                handleChange,
                handleSubmit, 
                handleBlur,
                isSubmitting,
            }) => (
                <CModal show={isEditModalFormOpen} onClose={closeEditModalForm}>
                    <CForm onSubmit={handleSubmit}>
                        <CModalHeader closeButton>
                            Изменить данные должности
                        </CModalHeader>
                        <CModalBody>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Должность</CLabel>
                                        </CCol>
                                        <CCol xs="12">
                                            <CInput 
                                                id="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.title && touched.title ? "border-error" : ""
                                                }
                                            />
                                            { <span className="text-danger">
                                                {errors.end_date && touched.title}  
                                              </span>}
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Описание</CLabel>
                                        </CCol>
                                        <CCol xs="12">
                                            <CInput 
                                                id="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.description && touched.description ? "border-error" : ""
                                                }
                                            />
                                            { <span className="text-danger">
                                                {errors.description && touched.description}  
                                              </span>}
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                        </CModalBody>
                        <CModalFooter className="d-flex">
                            <div>
                                <CButton
                                    color="info"
                                    onClick={() => handleReset()}
                                >
                                    Вернуть в исходное положение
                                </CButton>
                            </div>
                            <div>
                                { isLoading ? (
                                    <span className="mr-5">
                                        <MiniSpinner/>
                                    </span>
                                ) : (
                                    <CButton color="primary" type="submit" className="ml-2">
                                        Изменить
                                    </CButton>
                                )}
                                <CButton
                                    color="secondary"
                                    onClick={() => { handleReset(); closeEditModalForm()}}
                                    className="ml-2"

                                >
                                    Отмена
                                </CButton>
                            </div>
                        </CModalFooter>
                    </CForm>
                </CModal>

            )}

        </Formik>
        </>
    )
}
 export default PositionEditModalForm

