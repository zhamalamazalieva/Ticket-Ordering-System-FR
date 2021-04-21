import React, { useCallback, useContext, useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
  CCol,
} from "@coreui/react";
import PansionServiceContext from "../../context/PansionServiceContext";
import MiniSpinner from "../spinners/MiniSpinner";

function RoomsDeleteModalForm({
  selectedRoom,
  reFetchRooms,
  isDeleteModalFormOpen,
  closeDeleteModalForm,
}) {
  const PansionService = useContext(PansionServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async (id) => {
    setIsLoading(true);
    console.log(id)
    const { hasError } = await PansionService.deleteRooms(id);
    if (hasError) {
      console.log("Ошибка при удалении комнаты", hasError);
    } 
    else {
      reFetchRooms();
      closeDeleteModalForm();
    }
    setIsLoading(false);
  }, []);

  return (
    <CModal
      show={isDeleteModalFormOpen}
      onClose={closeDeleteModalForm}
      size="sm"
      centered
    >
      <CModalBody>Вы уверены, что хотите удалить комнату из списка?</CModalBody>
      <CModalFooter>
        <CRow>
          {isLoading ? (
            <span className="mr-4">
              <MiniSpinner />
            </span>
          ) : (
            <CButton
              color="danger"
              type="submit"
              onClick={() => onDelete(selectedRoom.id)}
              className="mr-2"
            >
              Удалить
            </CButton>
          )}
          <CButton color="secondary" onClick={() => closeDeleteModalForm()}>
            Отмена
          </CButton>
        </CRow>
      </CModalFooter>
    </CModal>
  );
}

export default RoomsDeleteModalForm;
