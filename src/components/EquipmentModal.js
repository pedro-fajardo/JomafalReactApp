import Modal from "react-bootstrap/Modal";
import EquipmentForm from "./EquipmentForm";

function EquipmentModal({isVisible, setModalVisible}) {
   return (
      <Modal
         size="xl"
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
   );
}

export default EquipmentModal;
