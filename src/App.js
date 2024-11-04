import { useState } from "react";
import Button from "react-bootstrap/Button";
import TopBar from "./components/TopBar";
import EquipmentModal from "./components/EquipmentModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EquipmentList from "./components/EquipmentList";
import EquipmentEditModal from "./components/EquipmentEditModal";
import ClientList from "./components/ClientList";


function App() {
   const [isVisible, setModalVisible] = useState(false);
   const [isToRefreshData, setIsToRefreshData] = useState(true);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
   const [editEquipmentId, setEditEquipmentId] = useState();
   const [selectedTab, setSelectedTab] = useState("equipments");

   const setSelectedTabHandler = (selectedTab) => {
      setSelectedTab(selectedTab);
      setIsToRefreshData(true);
   }


   return (
      <div>
         <TopBar selectedTab={selectedTab} setSelectedTab={setSelectedTabHandler} />
         <div className="card-list">
            <div className="flex flex-row pb-2 w-full">
               <div className="flex flex-col w-1/2"> {/* Align to the start */}
                  <div className="flex flex-row justify-start">
                     {selectedTab === "equipments" ? (
                        <h2>Lista de Equipamentos</h2>
                     ) : (
                        <h2>Lista de Clientes</h2>
                     )}
                  </div>
               </div>
               <div className="flex flex-col w-1/2"> {/* Align to the end */}
                  {selectedTab === "equipments" && (
                     <div className="flex flex-row justify-end">
                        <Button style={{ marginLeft: "auto" }} onClick={() => setModalVisible(true)}>
                           <b>+ Adicionar Equipamento</b>
                        </Button>
                        <EquipmentModal
                           setIsToRefreshData={setIsToRefreshData}
                           isVisible={isVisible}
                           setModalVisible={setModalVisible}
                        />
                     </div>
                  )}
               </div>
            </div>

            {selectedTab === "equipments" ?
               <div>
                  <EquipmentList isToRefreshData={isToRefreshData} setIsToRefreshData={setIsToRefreshData} setIsEditModalVisible={setIsEditModalVisible} setEditEquipmentId={setEditEquipmentId} />
                  {isEditModalVisible && (<EquipmentEditModal setIsToRefreshData={setIsToRefreshData} isEditModalVisible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible} equipmentId={editEquipmentId}></EquipmentEditModal>)}
               </div>
               :
               <div><ClientList isToRefreshData={isToRefreshData} setIsToRefreshData={setIsToRefreshData} /></div>
            }
         </div>
      </div>
   );
}

export default App;
