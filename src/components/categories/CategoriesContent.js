import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import PansionServiceContext from "../../context/PansionServiceContext";
import FullPageSpinner from "../spinners/FullPageSpinner";
import CategoriesTable from './CategoriesTable'
import CategoryDeleteModalForm from './CategoryDeleteModalForm'
import CategoryCreateModalForm from './CategoryCreateModalForm'
import CategoryEditModalForm from './CategoryEditModalForm'

function CategoriesContent(props) {

  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [isDeleteModalFormOpen, setIsDeleteModalFormOpen] = useState(false)
  const [isCreateModalFormOpen, setIsCreateModalFormOpen] = useState(false)
  const [isEditModalFormOpen, setIsEditModalFormOpen] = useState(false)

  //FETCHCategoryS
  const fetchCategories = useCallback( async () => {
      setIsLoading(true)
      const { hasError, data } = await PansionService.getCategories()
      if( hasError) {
          console.log('Ошибка при запросе GET')
      }
      else {
          setCategories(data)
      }
      setIsLoading(false)
  }, [])


  useEffect(() => {
      fetchCategories()
  },[])

  //REFETCHCategoryS
  const reFetchCategories = useCallback( async () => {
      fetchCategories()
  },[])

  //DELETECategory
  const openDeleteModalForm = useCallback( async () => {
    setIsDeleteModalFormOpen(true)
  },[])

  const closeDeleteModalForm = useCallback( async () => { 
    setIsDeleteModalFormOpen(false)
  },[])

  const onClickDelete = useCallback(async (category) => {
    setSelectedCategory(category)
    openDeleteModalForm()
  },[])

  //CREATECategory
  const openCreateModalForm = useCallback(() => { setIsCreateModalFormOpen(true)},[])
  const closeCreateModalForm = useCallback(() => { setIsCreateModalFormOpen(false)},[])

  //EDITCategory
  const openEditModalForm = useCallback(() => { setIsEditModalFormOpen(true)},[])
  const closeEditModalForm = useCallback(() => { setIsEditModalFormOpen(false)},[])
  const onCLickEdit = useCallback(category => { 
    setSelectedCategory(category) 
    openEditModalForm()},[])
    console.log("opened")

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>Управление потоками</CCol>
            <CCol>
              <CButton color="primary" className="float-right" onClick={openCreateModalForm}>
                <span className="mr-3">Добавить категорию</span>
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {isLoading ? <FullPageSpinner />
           : (
            <CategoriesTable
                categories={categories}
                onClickDelete={onClickDelete}
                onClickEdit={onCLickEdit}
             />
          )}
        </CCardBody>
      </CCard>
      {isCreateModalFormOpen && (
        <CategoryCreateModalForm
         closeCreateModalForm={closeCreateModalForm}
         isCreateModalFormOpen={isCreateModalFormOpen}
         categories={categories}
         reFetchCategories={reFetchCategories}        
        
        />
      )
      }
      { selectedCategory &&
        <CategoryDeleteModalForm
            isDeleteModalFormOpen={isDeleteModalFormOpen}
            closeDeleteModalForm={closeDeleteModalForm}
            selectedCategory={selectedCategory}
            reFetchCategories={reFetchCategories}
        />
      }
      { selectedCategory && 
        <CategoryEditModalForm
          isEditModalFormOpen={isEditModalFormOpen}
          closeEditModalForm={closeEditModalForm}
          selectedCategory={selectedCategory}
          reFetchCategories={reFetchCategories}
        />
      }
    </>
  );
}

export default CategoriesContent;
