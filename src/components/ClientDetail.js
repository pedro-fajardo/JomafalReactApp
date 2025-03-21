import React, { useState, useEffect } from "react";
import "dayjs/locale/en-gb";
import { Form, Row, Col } from "react-bootstrap";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Box,
   Button,
   TextField,
   InputAdornment,
   Typography,
   styled,
   Paper,
   CircularProgress,
   IconButton
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import BadgeIcon from '@mui/icons-material/Badge';
import TagIcon from '@mui/icons-material/Tag';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

// Custom styled button for primary actions
const PrimaryButton = styled(Button)(({ theme }) => ({
   backgroundColor: '#5B85AA',
   color: '#fff',
   '&:hover': {
      backgroundColor: '#2E5077',
   },
   '&.Mui-disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      color: 'rgba(0, 0, 0, 0.26)'
   }
}));

// Custom styled button for secondary actions
const SecondaryButton = styled(Button)(({ theme }) => ({
   backgroundColor: 'transparent',
   borderColor: '#5B85AA',
   color: '#5B85AA',
   '&:hover': {
      borderColor: '#2E5077',
      backgroundColor: 'rgba(91, 133, 170, 0.1)',
   },
   '&.Mui-disabled': {
      borderColor: 'rgba(0, 0, 0, 0.12)',
      color: 'rgba(0, 0, 0, 0.26)'
   }
}));

// Custom styled TextField
const StyledTextField = styled(TextField)({
   '& .MuiOutlinedInput-root': {
      height: '56px',
      '&:hover fieldset': {
         borderColor: '#5B85AA',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#5B85AA',
      },
   },
   '& .MuiFormLabel-root.Mui-focused': {
      color: '#5B85AA',
   }
});

function ClientDetail({
   setIsToRefreshData,
   isModalVisible,
   setIsModalVisible,
   clientId,
}) {
   const [address, setAddress] = useState("");
   const [phoneNumber, setPhoneNumber] = useState(0);
   const [clientName, setClientName] = useState("");
   const [postalCode, setPostalCode] = useState("");
   const [nif, setNif] = useState("");
   const [clientNumber, setClientNumber] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const getClient = async () => {
      setIsLoading(true);
      try {
         const { data } = await axios.get("/api/client/" + clientId + "/");
         setAddress(data.address);
         setPhoneNumber(data.phoneNumber);
         setClientName(data.name);
         setNif(data.nif);
         setClientNumber(data.clientNumber);
         setPostalCode(data.postalCode);
      } catch (error) {
         console.error("Error fetching client:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const updateClient = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         await axios.put("/api/client/" + clientId + "/", {
            name: clientName,
            phoneNumber: phoneNumber,
            address: address,
            postalCode: postalCode,
            nif: nif,
            clientNumber: clientNumber,
         });
         closeModal();
         setIsToRefreshData(true);
      } catch (error) {
         console.error("Error updating client:", error);
      } finally {
         setIsSubmitting(false);
      }
   };

   useEffect(() => {
      if (isModalVisible && clientId) {
         getClient();
      }
   }, [isModalVisible, clientId]);

   const closeModal = () => {
      setIsModalVisible(false);
   };

   const handlePhoneNumber = (value) => {
      const max = 999999999;
      const maxLength = max.toString().length;
      const newVal =
         value < max
            ? value
            : parseInt(value.toString().substring(0, maxLength));

      setPhoneNumber(newVal);
   };

   return (
      <Dialog
         open={isModalVisible}
         onClose={closeModal}
         fullWidth
         maxWidth="md"
         PaperProps={{
            sx: {
               borderRadius: 2,
               boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            }
         }}
      >
         <DialogTitle
            sx={{
               bgcolor: '#f8f9fa',
               borderBottom: '1px solid #e0e0e0',
               p: 2,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between'
            }}
         >
            <Typography variant="h6" color="#2E5077" fontWeight={600}>
               Editar Cliente
            </Typography>
            <IconButton onClick={closeModal} size="small" sx={{ color: '#757575' }}>
               <CloseIcon />
            </IconButton>
         </DialogTitle>

         <DialogContent sx={{ p: 3, mt: 1 }}>
            {isLoading ? (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6 }}>
                  <CircularProgress size={40} sx={{ color: '#5B85AA' }} />
               </Box>
            ) : (
               <Form onSubmit={updateClient}>
                  <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                     <Typography variant="h6" color="#2E5077" gutterBottom>
                        Detalhes do Cliente
                     </Typography>

                     <Box sx={{ mb: 3 }}>
                        <StyledTextField
                           fullWidth
                           label="Nome"
                           variant="outlined"
                           value={clientName}
                           onChange={(e) => setClientName(e.target.value)}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <PersonIcon color="action" />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Box>

                     <Box sx={{ mb: 3 }}>
                        <StyledTextField
                           fullWidth
                           label="Morada"
                           variant="outlined"
                           value={address}
                           onChange={(e) => setAddress(e.target.value)}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <HomeIcon color="action" />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Box>

                     <Row>
                        <Col>
                           <Box sx={{ mb: 3 }}>
                              <StyledTextField
                                 fullWidth
                                 label="Nº de Telemóvel"
                                 variant="outlined"
                                 type="number"
                                 value={phoneNumber}
                                 onChange={(e) => handlePhoneNumber(e.target.value)}
                                 InputProps={{
                                    startAdornment: (
                                       <InputAdornment position="start">
                                          <PhoneIcon color="action" />
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </Box>
                        </Col>

                        <Col>
                           <Box sx={{ mb: 3 }}>
                              <StyledTextField
                                 fullWidth
                                 label="Código Postal"
                                 variant="outlined"
                                 value={postalCode}
                                 onChange={(e) => setPostalCode(e.target.value)}
                                 InputProps={{
                                    startAdornment: (
                                       <InputAdornment position="start">
                                          <MarkunreadMailboxIcon color="action" />
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </Box>
                        </Col>
                     </Row>

                     <Row>
                        <Col>
                           <Box sx={{ mb: 3 }}>
                              <StyledTextField
                                 fullWidth
                                 label="NIF"
                                 variant="outlined"
                                 type="number"
                                 value={nif}
                                 onChange={(e) => setNif(e.target.value)}
                                 InputProps={{
                                    startAdornment: (
                                       <InputAdornment position="start">
                                          <BadgeIcon color="action" />
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </Box>
                        </Col>

                        <Col>
                           <Box sx={{ mb: 3 }}>
                              <StyledTextField
                                 fullWidth
                                 label="Nº Cliente Jomafal"
                                 variant="outlined"
                                 value={clientNumber}
                                 onChange={(e) => setClientNumber(e.target.value)}
                                 InputProps={{
                                    startAdornment: (
                                       <InputAdornment position="start">
                                          <TagIcon color="action" />
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </Box>
                        </Col>
                     </Row>
                  </Paper>
               </Form>
            )}
         </DialogContent>

         <DialogActions sx={{ p: 3, pt: 1, borderTop: '1px solid #f0f0f0' }}>
            <SecondaryButton
               variant="outlined"
               onClick={closeModal}
               disabled={isSubmitting}
               size="large"
            >
               Cancelar
            </SecondaryButton>

            <PrimaryButton
               variant="contained"
               onClick={updateClient}
               disabled={isSubmitting || isLoading}
               size="large"
            >
               {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
               ) : (
                  'Guardar Alterações'
               )}
            </PrimaryButton>
         </DialogActions>
      </Dialog>
   );
}

export default ClientDetail;
