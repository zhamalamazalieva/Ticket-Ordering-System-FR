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

function RoomEditModalForm ({
    isEditModalFormOpen,
    closeEditModalForm,
    reFetchRooms,
    selectedRoom
}){

    const formValues = {
        title: selectedRoom.title,
        description: selectedRoom.description,
        seats:selectedRoom.seats,
        category: selectedRoom.category,
        latitude:selectedRoom.latitude,
        longitude:selectedRoom.longitude
    }

    const PansionSevice = useContext(PansionServiceContext)

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async( values ) => {
        setIsLoading(true)
        const { hasError, data } = await PansionSevice.updateRoom({
            id:selectedRoom.id,
            title: values.title,
            description: values.description,
            seats:values.seats,
            category: values.category,
            latitude:values.latitude,
            longitude:values.longitude
        }) 
        if( hasError ){
            console.log('Ошибка про запросе: ', hasError)
            console.log(   selectedRoom.id,values.title,values.description, values.seats,values.category,values.latitude,values.longitude)
        }
        else{
            reFetchRooms()
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
                !values.category && (errors.category = 'Обязательное поле')
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
                            Изменить данные номера 
                        </CModalHeader>
                        <CModalBody>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Номер</CLabel>
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
                                                {errors.title && touched.title}  
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
                                                value={values.end_date}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />                                          
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Количество мест</CLabel>
                                        </CCol>
                                        <CCol xs="12">
                                            <CInput 
                                                id="seats"
                                                type="number"
                                                value={values.seats}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Категория</CLabel>
                                        </CCol>
                                        <CCol xs="12">
                                            <CInput 
                                                id="category"
                                                type="number"
                                                value={values.category}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.category && touched.category ? "border-error" : ""
                                                }
                                            />
                                            { <span className="text-danger">
                                                {errors.category && touched.category}  
                                              </span>}
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Ширина</CLabel>
                                        </CCol>
                                        <CCol xs="12">
                                            <CInput 
                                                id="latitude"
                                                type="number"
                                                value={values.latitude}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CFormGroup row>
                                        <CCol xs="12">
                                            <CLabel>Долгота</CLabel>
                                        </CCol>
                                        <CCol xs="12">
                                            <CInput 
                                                id="longitude"
                                                type="number"
                                                value={values.longitude}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
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
 export default RoomEditModalForm

