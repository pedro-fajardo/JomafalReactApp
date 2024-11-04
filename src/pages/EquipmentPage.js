import { useState } from "react";
import Button from "react-bootstrap/Button";
import EquipmentModal from "../components/EquipmentModal";
import EquipmentList from "../components/EquipmentList";
import EquipmentEditModal from "../components/EquipmentEditModal";

function EquipmentPage() {
   const [isVisible, setModalVisible] = useState(false);
   const [isToRefreshData, setIsToRefreshData] = useState(true);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
   const [editEquipmentId, setEditEquipmentId] = useState();

   return (
      <div>
         <div className="card-list">
            <div className="flex flex-row pb-2 w-full">
               <div className="flex flex-col w-1/2"> {/* Align to the start */}
                  <div className="flex flex-row justify-start">
                     <h2>Lista de Equipamentos</h2>
                  </div>
               </div>
               <div className="flex flex-col w-1/2"> {/* Align to the end */}
                  <div className="flex flex-row justify-end">
                     <Button onClick={() => setModalVisible(true)}>
                        <b>+ Adicionar Equipamento</b>
                     </Button>
                     <EquipmentModal
                        setIsToRefreshData={setIsToRefreshData}
                        isVisible={isVisible}
                        setModalVisible={setModalVisible}
                     />
                  </div>
               </div>
            </div>

            <div>
               <EquipmentList isToRefreshData={isToRefreshData} setIsToRefreshData={setIsToRefreshData} setIsEditModalVisible={setIsEditModalVisible} setEditEquipmentId={setEditEquipmentId} />
               {isEditModalVisible && (<EquipmentEditModal setIsToRefreshData={setIsToRefreshData} isEditModalVisible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible} equipmentId={editEquipmentId}></EquipmentEditModal>)}
            </div>
         </div>
      </div>
   );
}

export default EquipmentPage;
