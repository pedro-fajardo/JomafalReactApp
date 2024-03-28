import { useState } from "react";
import Button from "react-bootstrap/Button";
import TopBar from "./components/TopBar";
import EquipmentModal from "./components/EquipmentModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EquipmentList from "./components/EquipmentList";
import dummyData from "./data";


function App() {
   const [isVisible, setModalVisible] = useState(false);

   return (
      <div>
         <TopBar />
         <div className="card-list">
            <Row style={{paddingBottom: '2%'}}>
               <Col><h2>Lista de Equipamentos:</h2></Col>
               <Col></Col>
               <Col></Col>
               <Col></Col>
               <Col>
                  <Button onClick={() => setModalVisible(true)}>
                     Adicionar Equipamento
                  </Button>
                  <EquipmentModal isVisible={isVisible} setModalVisible={setModalVisible}></EquipmentModal>
               </Col>
            </Row>
            
            <EquipmentList equipments={dummyData}/>
         </div>
      </div>
   );
}

export default App;
