import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
  } from "@coreui/react";
import React, { useState,useContext, useEffect, useCallback} from 'react'
import PansionServiceContext from "../../context/PansionServiceContext"
import UsersDeleteModal from "./UsersDeleteModal";
import UsersTable from './UsersTable';


function UsersContent( props){
    const PansionService  = useContext(PansionServiceContext)

    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false)

   

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        const { hasError, data } = await PansionService.getUsers();
        if( hasError){
            console.log(hasError)
        }
        else{
            setUsers(data)
        }
        setIsLoading(false)
    },[])

    useEffect(() => {
        fetchUsers()
    }, [])

    const reFetchUsers = useCallback( async ()=> {
        fetchUsers()
    },[])

//DELETE USER
    const openDeleteConfirmModal = useCallback( async () => setIsDeleteConfirmModalOpen(true), [])
    const closeDeleteConfirmModal = useCallback( async () => setIsDeleteConfirmModalOpen(false), [])

    const onDeleteClick = useCallback( (user) => {
        setSelectedUser(user)
        openDeleteConfirmModal()
    },[])
    return(
            <>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>Управление сотрудниками</CCol>
                    <CCol>
                      <CButton
                        color="primary"
                        className="float-right"
                      >
                        <span className="mr-3">Добавить сотрудника</span>
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                    {
                        isLoading ? "Loading...":""
                    }
                    <UsersTable
                        users={users}
                        onDeleteClick={onDeleteClick}

                    />
                </CCardBody>
              </CCard>
              {selectedUser && (
                  <UsersDeleteModal
                    isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
                    closeDeleteConfirmModal={closeDeleteConfirmModal}
                    selectedUser={selectedUser}
                    reFetchUsers={reFetchUsers}
                  />
              )}
            </>
          );
}
export default UsersContent;

