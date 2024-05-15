import Modal from "react-bootstrap/Modal";
import EquipmentForm from "./EquipmentForm";
import Wizard from "./Wizard";


function EquipmentModal({isVisible, setModalVisible}) {
   const closeModal = () => {
      setModalVisible(false);
   };

   const steps = [
      { title: 'Step 1', content: 'This is step 1' },
      { title: 'Step 2', content: 'This is step 2' },
      { title: 'Step 3', content: 'This is step 3' },
   ];

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
            {/*<EquipmentForm setModalVisible={setModalVisible}></EquipmentForm>*/}
            <Wizard steps={steps} closeModal={closeModal}></Wizard>
         </Modal.Body>
      </Modal>
   );
}

export default EquipmentModal;
