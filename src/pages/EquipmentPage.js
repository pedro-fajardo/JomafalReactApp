import { useState } from "react";
import EquipmentModal from "../components/EquipmentModal";
import EquipmentList from "../components/EquipmentList";
import EquipmentEditModal from "../components/EquipmentEditModal";

function EquipmentPage() {
   const [isVisible, setModalVisible] = useState(false);
   const [isToRefreshData, setIsToRefreshData] = useState(true);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
   const [editEquipmentId, setEditEquipmentId] = useState();

   return (
      <div className="max-w-full px-4 sm:px-6 lg:px-8 mx-auto">
         <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Lista de Equipamentos</h2>

               <button
                  onClick={() => setModalVisible(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 flex items-center"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Adicionar Equipamento
               </button>
            </div>

            <div>
               <EquipmentList
                  isToRefreshData={isToRefreshData}
                  setIsToRefreshData={setIsToRefreshData}
                  setIsEditModalVisible={setIsEditModalVisible}
                  setEditEquipmentId={setEditEquipmentId}
               />

               {isEditModalVisible && (
                  <EquipmentEditModal
                     setIsToRefreshData={setIsToRefreshData}
                     isEditModalVisible={isEditModalVisible}
                     setIsEditModalVisible={setIsEditModalVisible}
                     equipmentId={editEquipmentId}
                  />
               )}
            </div>
         </div>

         <EquipmentModal
            setIsToRefreshData={setIsToRefreshData}
            isVisible={isVisible}
            setModalVisible={setModalVisible}
         />
      </div>
   );
}

export default EquipmentPage;
