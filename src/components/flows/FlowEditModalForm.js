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

function FlowEditModalForm ({
    isEditModalFormOpen,
    closeEditModalForm,
    reFetchFlows,
    selectedFlow
}){

    const formValues = {
        start_date: selectedFlow.start_date,
        end_date: selectedFlow.end_date,
        title:selectedFlow.title,
        description: selectedFlow.description
    }

    const PansionSevice = useContext(PansionServiceContext)

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async( values ) => {
        setIsLoading(true)
        const { hasError, data } = await PansionSevice.updateFlow({
            id: selectedFlow.id,
            start_date: values.start_date,
            end_date: values.end_date,
            title: values.title,
            description: values.description
        }) 
        if( hasError ){
            console.log('Ошибка про запросе: ', hasError)
        }
        else{
            reFetchFlows()
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
                !values.start_date && (errors.start_date = 'Обязательное поле')
                !values.end_date && (errors.end_date = 'Обязательное поле')
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
                            Изменить данные потока
                        </CModalHeader>
                        <CModalBody>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Начало потока</CLabel>
                                        </CCol>
                                        <CCol xs="12">
                                            <CInput 
                                                id="start_date"
                                                type="date"
                                                value={values.start_date}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.start_date && touched.start_date ? "border-error" : ""
                                                }
                                            />
                                            { <span className="text-danger">
                                                {errors.start_date && touched.start_date}  
                                              </span>}
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Конец потока</CLabel>
                                        </CCol>
                                        <CCol xs="12">
                                            <CInput 
                                                id="end_date"
                                                type="date"
                                                value={values.end_date}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.end_date && touched.end_date ? "border-error" : ""
                                                }
                                            />
                                            { <span className="text-danger">
                                                {errors.end_date && touched.end_date}  
                                              </span>}
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Поток</CLabel>
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
 export default FlowEditModalForm

