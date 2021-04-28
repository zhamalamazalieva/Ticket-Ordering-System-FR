import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useState, useContext, useEffect, useCallback } from "react"
import PansionServiceContext from "../../context/PansionServiceContext"
import UserCreateFormModal from "./UsersCreateFormModal"
import UsersDeleteModal from "./UsersDeleteModal"
import UserEditFormModal from "./UserEditFormModal"
import UsersTable from "./UsersTable"


function UsersContent(props) {

  const PansionService = useContext(PansionServiceContext);


  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);


  const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);

  //FETCH USER
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await PansionService.getUsers();
    if (hasError) {
      console.log(hasError)
    } else {
      setUsers(data)
    }
    setIsLoading(false)
  }, [])


  useEffect(() => {
    fetchUsers()
  }, [])


  const reFetchUsers = useCallback(async () => 
    fetchUsers(), [])


  //DELETE USER
  const openDeleteConfirmModal = useCallback(
    async () => setIsDeleteConfirmModalOpen(true),[])

  const closeDeleteConfirmModal = useCallback(
    async () => setIsDeleteConfirmModalOpen(false),[])

  const onClickDelete = useCallback((user) => {
    setSelectedUser(user)
    openDeleteConfirmModal()}, [])


  //CREATE USER
  const openCreateFormModal = useCallback(() => {
    setIsCreateFormModalOpen(true)
  }, [])
  const closeCreateFormModal = useCallback(() => {
    setIsCreateFormModalOpen(false)
  }, [])

//EDIT DEPARTMENT
  const openEditFormModal = useCallback(
    () => setIsEditFormModalOpen(true), [])
  
  const closeEditFormModal = useCallback(() =>     
    {
      setIsEditFormModalOpen(false)
      setSelectedUser(null)
    
    }, [])

  const onClickEdit = useCallback((user) => {
    setSelectedUser(user)
    openEditFormModal()
    console.log('edit open:', isEditFormModalOpen)

  }, [])


  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>Управление сотрудниками</CCol>
            <CCol>
              <CButton
                color="primary"
                className="float-right"
                onClick={openCreateFormModal}
              >
                <span className="mr-3">Добавить сотрудника</span>
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {isLoading ? "Loading..." : ""}
          <UsersTable 
          users={users}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
          />
        </CCardBody>
      </CCard>
      {isCreateFormModalOpen && (
        <UserCreateFormModal
          openFormModal={openCreateFormModal}
          isFormModalOpen={isCreateFormModalOpen}
          closeFormModal={closeCreateFormModal}
          setUsers={setUsers}
          users={users}
          reFetchUsers={reFetchUsers}
        />
      )}
      { isEditFormModalOpen && (
        <UserEditFormModal
          isFormModalOpen={isEditFormModalOpen}
          openFormModal={openEditFormModal}
          closeFormModal={closeEditFormModal}
          reFetchUsers={reFetchUsers}
          selectedUser={selectedUser}
        />
      )}
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
