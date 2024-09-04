import { useState, useEffect } from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { TailSpin } from "react-loader-spinner";
import TopBar from "./components/TopBar";
import EquipmentModal from "./components/EquipmentModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EquipmentList from "./components/EquipmentList";
import EquipmentEditModal from "./components/EquipmentEditModal";


function App() {
   const [isVisible, setModalVisible] = useState(false);
   const [isToRefreshData, setIsToRefreshData] = useState(true);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
   const [editEquipmentId, setEditEquipmentId] = useState();


   return (
      <div>
         <TopBar />
         <div className="card-list">
            <Row style={{ paddingBottom: '2%' }}>
               <Col><h2>Lista de Equipamentos:</h2></Col>
               <Col></Col>
               <Col></Col>
               <Col></Col>
               <Col>
                  <Button onClick={() => setModalVisible(true)}>
                     Adicionar Equipamento
                  </Button>
                  <EquipmentModal isToRefreshData={isToRefreshData} setIsToRefreshData={setIsToRefreshData} isVisible={isVisible} setModalVisible={setModalVisible}></EquipmentModal>
               </Col>
            </Row>

            <EquipmentList isToRefreshData={isToRefreshData}  setIsToRefreshData={setIsToRefreshData} setIsEditModalVisible={setIsEditModalVisible} setEditEquipmentId={setEditEquipmentId} />
            { isEditModalVisible && ( <EquipmentEditModal isEditModalVisible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible} equipmentId={editEquipmentId}></EquipmentEditModal>)}
         </div>
      </div>
   );
}

export default App;
