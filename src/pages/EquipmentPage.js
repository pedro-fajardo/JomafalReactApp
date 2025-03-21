import { useState } from "react";
import EquipmentModal from "../components/EquipmentModal";
import EquipmentList from "../components/EquipmentList";
import EquipmentEditModal from "../components/EquipmentEditModal";
import { Button, Box, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function EquipmentPage() {
   const [isVisible, setModalVisible] = useState(false);
   const [isToRefreshData, setIsToRefreshData] = useState(true);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
   const [editEquipmentId, setEditEquipmentId] = useState();

   return (
      <Box sx={{ maxWidth: '100%', px: { xs: 2, sm: 3, lg: 4 }, mx: 'auto' }}>
         <Paper
            elevation={2}
            sx={{
               borderRadius: 2,
               p: 3,
               mt: 2,
               backgroundColor: '#fff'
            }}
         >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
               <Button
                  variant="contained"
                  onClick={() => setModalVisible(true)}
                  startIcon={<AddIcon />}
                  sx={{
                     backgroundColor: '#5B85AA',
                     '&:hover': {
                        backgroundColor: '#2E5077',
                     },
                     borderRadius: 1,
                     boxShadow: '0 2px 8px rgba(46, 80, 119, 0.2)',
                     px: 2,
                     py: 1,
                     fontWeight: 500
                  }}
               >
                  Adicionar Equipamento
               </Button>
            </Box>

            <Box>
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
            </Box>
         </Paper>

         <EquipmentModal
            setIsToRefreshData={setIsToRefreshData}
            isVisible={isVisible}
            setModalVisible={setModalVisible}
         />
      </Box>
   );
}

export default EquipmentPage;
