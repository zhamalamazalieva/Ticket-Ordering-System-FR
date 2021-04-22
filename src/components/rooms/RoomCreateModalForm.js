import React, { useState, useContext, useEffect} from "react";
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
import PansionServiceContext from "../../context/PansionServiceContext";
import MiniSpinner from "../spinners/MiniSpinner";
import { Formik } from "formik";
import Select from 'react-select'


function RoomCreateModalForm({
  isCreateModalFormOpen,
  closeCreateModalForm,
  reFetchRooms,
}) {

  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [fetchCategoriesError, setFetchCategoriesError] = useState(null)

  useEffect(() => {
    const fetchCategories = async() =>{
      const { hasError, data } = await PansionService.getCategories()
      if(hasError){
        setFetchCategoriesError("Произошла ошибка при загрузке данные о категориях")
      }
      else{
        const cat = data.map((c) => ({value: c.id, label: `${c.title}`}))
        setCategories(cat)
        cat[0] && setSelectedCategory(cat[0])
      }
      return null
    }
    fetchCategories()
  },[PansionService])


  const onSubmit = async (values) => {
    console.log("Uspeshno");

    setIsLoading(true);
    const { hasError, data } = await PansionService.createRoom({
      ...values,
      category:selectedCategory.value
    });
    if (hasError) {
      console.log("errorrrrrr");
    } else {
      reFetchRooms();
      closeCreateModalForm()
      console.log("Uspeshno");
    }
    setIsLoading(false);
  };
  

  return (
    <Formik
      initialValues={formValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        !values.title && (errors.title = "Обязательное поле");
        return errors;
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        touched,
        handleBlur,
        errors,
        handleReset,
      }) => (
        <CModal
          show={isCreateModalFormOpen}
          onClose={closeCreateModalForm}
          size="sm"
          centered
        >
          <CModalBody>
            <CForm onSubmit={handleSubmit}>
              <CModalHeader closeButton>
                Добавление нового номера
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
                          required
                          value={values.title}
                          onChange={handleChange}
                          className={
                            errors.title && touched.title
                              ? "border-error"
                              : ""
                          }
                        />
                        {
                          <span className="text-danger">
                            {errors.title &&
                              touched.title &&
                              errors.title}
                          </span>
                        }
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel >Описание</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                        id="description"
                          required
                          value={values.description}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CLabel >Seats</CLabel>
                      </CCol>
                      <CCol xs="12">
                        <CInput
                        id="seats"
                          required
                          type="number"
                          value={values.seats}
                          onChange={handleChange}
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
                       { fetchCategoriesError ? (
                         <span className="text-danger">{fetchCategoriesError}</span>
                       ):(
                         <Select
                          options={categories}
                          value={selectedCategory}
                          onChange={(s) => setSelectedCategory(s)}
                         />
                       )}
                       </CCol>
                    </CFormGroup>
                    </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                {isLoading ? (
                  <div className="mr-5">
                    <MiniSpinner />
                  </div>
                ) : (
                  <CButton color="primary" type="submit">
                    Добавить
                  </CButton>
                )}
                <CButton color="secondary" onClick={closeCreateModalForm}>
                  Cancel
                </CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      )}
    </Formik>
  );
}
const formValues = {
  title: "",
  description: "",
  seats: "",
  category:"",
 

};

export default RoomCreateModalForm;
