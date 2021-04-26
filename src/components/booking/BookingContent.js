import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
} from "@coreui/react";
import {useState, useEffect, useContext} from 'react'
import PansionServiceContext from '../../context/PansionServiceContext'
import Select from 'react-select'

const BookingContent = () => {

  const PansionService = useContext(PansionServiceContext)

  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelecredCategory] = useState({})
  const [fetchCategoryError, setFetchCategoryError] = useState(null)

  useEffect(() =>{
    const fetchCategory = async () => {
      const { hasError, data } = await PansionService.getCategories()
      if(hasError){
        setFetchCategoryError("Произошла ошибка при заргрузке категорий")
      }
      else{
        const cat = data.map(c => ({value: c.id, label:`${c.title}`}))
        setCategories(cat)
        cat[0] && setSelecredCategory(cat[0])
      }
    }
    fetchCategory()

  },[PansionService])

  return (
    <CCard>
      <CCardHeader className="">
        <h5>Забронировать номер</h5>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow>
            <CCol className="col-3">
                <CLabel htmlFor="first_name">Дата заезда</CLabel>
                <CInput
                  required 
                  type="date"                     
                />
              <CLabel htmlFor="first_name">Дата выезда</CLabel>
              <CInput
                required 
                type="date"                     
              />
            </CCol>
            <CCol className="col-3">
                  <CLabel htmlFor="first_name">Количество взрослых гостей</CLabel>
                  <CInput
                    required 
                    type="number"  
                    min="1"                   
                  />
            </CCol>
            <CCol  className="col-3">
                    <CLabel htmlFor="first_name">Количество детей</CLabel>
                    <CInput
                      required 
                      type="number"      
                      min="0"               
                    />
            </CCol>   
            <CCol className="col-3">
            <CRow className="col-12">
            <CLabel htmlFor="first_name">Категория номера</CLabel>
            </CRow >              
              { fetchCategoryError ? (
                <span className="text-danger">
                  { fetchCategoryError}
                </span>
              ) : 
                <Select 
                options={categories}
                value={selectedCategory}
                onChange={(s) => setSelecredCategory(s)} />
              }               
            </CCol>         
          </CRow>          
          <CRow>           
          </CRow>
        </CForm>       
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" size="sm" color="primary" className="p-2">
          Забронировать
        </CButton>
        <CButton type="reset" size="sm" color="danger" className="p-2 ml-3">
          Отмена
        </CButton>
      </CCardFooter>
    </CCard>
  );
};
export default BookingContent;
