import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EquipmentForm from "./EquipmentForm";

function EquipmentModal() {
   const [isVisible, setModalVisible] = useState(false);

   return (
      <>
         <Button onClick={() => setModalVisible(true)}>
            Adicionar Equipamento
         </Button>

         <Modal
            size="lg"
            show={isVisible}
            onHide={() => setModalVisible(false)}
            backdrop="static"
            aria-labelledby="example-modal-sizes-title-lg"
            centered
         >
            <Modal.Header closeButton>
               <Modal.Title id="example-modal-sizes-title-lg">
                  Novo Equipamento:
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <EquipmentForm></EquipmentForm>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default EquipmentModal;
