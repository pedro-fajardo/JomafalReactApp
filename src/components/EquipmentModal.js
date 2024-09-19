import Modal from "react-bootstrap/Modal";
import Wizard from "./Wizard";


function EquipmentModal({isVisible, setModalVisible, setIsToRefreshData}) {
   const closeModal = () => {
      setModalVisible(false);
   };

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
            <Wizard setIsToRefreshData={setIsToRefreshData} closeModal={closeModal}></Wizard>
         </Modal.Body>
      </Modal>
   );
}

export default EquipmentModal;
