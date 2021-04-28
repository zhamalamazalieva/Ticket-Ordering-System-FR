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
import FullPageSpinner from "../../components/spinners/FullPageSpinner";
import FlowsTable from "./FlowsTable";
import FlowDeleteModalForm from "./FlowDeleteModalForm";
import FlowCreateModalForm from "./FlowCreateModalForm";
import FlowEditModalForm from "./FlowEditModalForm";

function FlowsContent(props) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [flows, setFlows] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState(null);

  const [isDeleteModalFormOpen, setIsDeleteModalFormOpen] = useState(false);
  const [isCreateModalFormOpen, setIsCreateModalFormOpen] = useState(false);
  const [isEditModalFormOpen, setIsEditModalFormOpen] = useState(false);

  //FETCHFLOWS
  const fetchFlows = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await PansionService.getFlows();
    if (hasError) {
      console.log("Ошибка при запросе GET");
    } else {
      setFlows(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchFlows();
  }, []);

  //REFETCHFLOWS
  const reFetchFlows = useCallback(async () => {
    fetchFlows();
  }, []);

  //DELETEFLOW
  const openDeleteModalForm = useCallback(async () => {
    setIsDeleteModalFormOpen(true);
  }, []);

  const closeDeleteModalForm = useCallback(async () => {
    setIsDeleteModalFormOpen(false);
  }, []);

  const onClickDelete = useCallback(async (flow) => {
    setSelectedFlow(flow);
    openDeleteModalForm();
  }, []);

  //CREATEFLOW
  const openCreateModalForm = useCallback(() => {
    setIsCreateModalFormOpen(true);
  }, []);
  const closeCreateModalForm = useCallback(() => {
    setIsCreateModalFormOpen(false);
  }, []);

  //EDITFLOW
  const openEditModalForm = useCallback(() => {
    setIsEditModalFormOpen(true);
  }, []);
  const closeEditModalForm = useCallback(() => {
    setIsEditModalFormOpen(false);
    setSelectedFlow(null)
  }, []);
  const onCLickEdit = useCallback((flow) => {
    setSelectedFlow(flow);
    openEditModalForm();
  }, []);
  console.log("opened");

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>Управление потоками</CCol>
            <CCol>
              <CButton
                color="primary"
                className="float-right"
                onClick={openCreateModalForm}
              >
                <span className="mr-3">Добавить поток</span>
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {isLoading ? (
            <FullPageSpinner />
          ) : (
            <FlowsTable
              flows={flows}
              onClickDelete={onClickDelete}
              onClickEdit={onCLickEdit}
            />
          )}
        </CCardBody>
      </CCard>
      {isCreateModalFormOpen && (
        <FlowCreateModalForm
          closeCreateModalForm={closeCreateModalForm}
          isCreateModalFormOpen={isCreateModalFormOpen}
          flows={flows}
          reFetchFlows={reFetchFlows}
        />
      )}
      {selectedFlow && (
        <FlowDeleteModalForm
          isDeleteModalFormOpen={isDeleteModalFormOpen}
          closeDeleteModalForm={closeDeleteModalForm}
          selectedFlow={selectedFlow}
          reFetchFlows={reFetchFlows}
        />
      )}
      {selectedFlow && (
        <FlowEditModalForm
          isEditModalFormOpen={isEditModalFormOpen}
          closeEditModalForm={closeEditModalForm}
          selectedFlow={selectedFlow}
          reFetchFlows={reFetchFlows}
        />
      )}
    </>
  );
}

export default FlowsContent;
