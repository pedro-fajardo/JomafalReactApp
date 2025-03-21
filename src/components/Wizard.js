import React, { useEffect, useState } from "react";
import axios from "axios";
import {
   Box,
   Stepper,
   Step,
   StepLabel,
   Button,
   Typography,
   Paper,
   Container,
   StepConnector,
   stepConnectorClasses,
   styled,

} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BuildIcon from '@mui/icons-material/Build';
import ClientForm from "./ClientForm";
import EquipmentForm from "./EquipmentForm";
import FeedbackMessage from "./FeedbackMessage";

// Custom connector styling
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
   [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
   },
   [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
         backgroundImage: 'linear-gradient(90deg, #2E5077 0%, #5B85AA 100%)',
      },
   },
   [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
         backgroundImage: 'linear-gradient(90deg, #2E5077 0%, #5B85AA 100%)',
      },
   },
   [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
   },
}));

// Custom step icon styling
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
   zIndex: 1,
   color: '#fff',
   width: 50,
   height: 50,
   display: 'flex',
   borderRadius: '50%',
   justifyContent: 'center',
   alignItems: 'center',
   ...(ownerState.active && {
      backgroundImage: 'linear-gradient(135deg, #2E5077 0%, #5B85AA 100%)',
      boxShadow: '0 4px 10px 0 rgba(46, 80, 119, 0.25)',
   }),
   ...(ownerState.completed && {
      backgroundImage: 'linear-gradient(135deg, #2E5077 0%, #5B85AA 100%)',
   }),
}));

// Custom step icon component
function ColorlibStepIcon(props) {
   const { active, completed, className } = props;

   const icons = {
      1: <PersonAddIcon />,
      2: <BuildIcon />,
   };

   return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
         {completed ? <CheckIcon /> : icons[String(props.icon)]}
      </ColorlibStepIconRoot>
   );
}

const steps = ["Escolher/Registar Cliente", "Equipamento para reparação"];

export default function Wizard({ closeModal, setIsToRefreshData }) {
   const [receivedDate, setReceivedDate] = useState(null);
   const [documentNumber, setDocumentNumber] = useState("");
   const [productNumber, setProductNumber] = useState("");
   const [serialNumber, setSerialNumber] = useState("");
   const [name, setName] = useState("");
   const [breakdown, setBreakdown] = useState("");
   const [observations, setObservations] = useState("");
   const [status, setStatus] = useState("new");
   const [warranty, setWarranty] = useState(true);
   const [receiptNumber, setReceiptNumber] = useState("");
   const [warrantyDate, setWarrantyDate] = useState(null);

   const getClients = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get("/api/clients");
         setClientList(prevList => {
            if (prevList !== response.data) {
               setClientListOptions(prevOptions => {
                  const options = response.data.map(client => ({
                     value: client.id,
                     label: client.name,
                  }));

                  if (JSON.stringify(prevOptions) !== JSON.stringify(options)) {
                     return options;
                  }
                  return prevOptions || [];
               });
               return response.data;
            }
            return prevList;
         });
      } catch (error) {
         console.error("Error fetching clients:", error);
         setErrorMessage("Falha ao carregar a lista de clientes. Por favor, tente novamente.");
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      getClients();
   }, []);

   const putEquipment = async () => {
      setSubmitting(true);
      try {
         await axios.post("/api/equipments/", {
            name: name,
            serialNumber: serialNumber,
            productNumber: productNumber,
            breakdown: breakdown,
            observations: observations,
            documentNumber: documentNumber,
            receivedDate: receivedDate,
            client: clientData.id,
            status: status,
            warranty: warranty,
            warrantyDate: warrantyDate,
            receiptNumber: receiptNumber,
         });

         setSuccessMessage("Equipamento registado com sucesso!");
         setTimeout(() => {
            closeModal();
            setIsToRefreshData(true);
         }, 1500);
      } catch (error) {
         console.error("Error saving equipment:", error);
         setErrorMessage("Falha ao registar o equipamento. Por favor, verifique os dados e tente novamente.");
         setSubmitting(false);
      }
   };

   const handleEquipmentSubmit = (e) => {
      e.preventDefault();
      putEquipment();
   };

   const [address, setAddress] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [clientName, setClientName] = useState("");
   const [postalCode, setPostalCode] = useState("");
   const [nif, setNif] = useState("");
   const [clientNumber, setClientNumber] = useState("");
   const [existingClientSelected, setExistingClientSelected] = useState(false);
   const [inputsDisabled, setInputsDisabled] = useState(false);
   const [selectedClientOption, setSelectedClientOption] = useState({ value: null });
   const [clientData, setClientData] = useState({});
   const [clientList, setClientList] = useState([]);
   const [clientListOptions, setClientListOptions] = useState([]);
   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const [submitting, setSubmitting] = useState(false);

   const putClient = async () => {
      setSubmitting(true);
      try {
         const response = await axios.post("/api/clients/", {
            name: clientName,
            phoneNumber: phoneNumber,
            address: address,
            postalCode: postalCode,
            nif: nif,
            clientNumber: clientNumber,
         });
         setClientData(response.data);
         setSuccessMessage("Cliente registado com sucesso! A prosseguir para o próximo passo...");
         setTimeout(() => {
            setSuccessMessage("");
            handleNext();
         }, 1500);
      } catch (error) {
         console.error("Error saving client:", error);
         setErrorMessage("Falha ao registar o cliente. Por favor, verifique os dados e tente novamente.");
         setSubmitting(false);
      }
   };

   const handleClientSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");

      if (!existingClientSelected) {
         await putClient();
      } else {
         handleNext();
      }
   };

   const [activeStep, setActiveStep] = useState(0);
   const [isLoading, setIsLoading] = useState(false);

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setErrorMessage("");
      setSuccessMessage("");
      setSubmitting(false);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setErrorMessage("");
      setSuccessMessage("");
   };

   const handleReset = () => {
      setActiveStep(0);
      setErrorMessage("");
      setSuccessMessage("");
   };

   return (
      <Container maxWidth="md" sx={{ mb: 4 }}>
         <Paper
            elevation={3}
            sx={{
               p: { xs: 2, md: 4 },
               borderRadius: 2,
               backgroundColor: '#fff'
            }}
         >
            <Box sx={{ mb: 4 }}>
               <Typography variant="h5" align="center" fontWeight="600" color="#2E5077" gutterBottom>
                  {activeStep === 0 ? "Selecione ou Registe um Cliente" : "Dados do Equipamento"}
               </Typography>

               <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />} sx={{ mt: 3 }}>
                  {steps.map((label) => (
                     <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
            </Box>

            <FeedbackMessage
               type="error"
               message={errorMessage}
            />

            <FeedbackMessage
               type="success"
               message={successMessage}
            />

            {activeStep === steps.length ? (
               <Box sx={{ mt: 3, mb: 1, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                     Processo concluído com sucesso!
                  </Typography>
                  <Button
                     onClick={handleReset}
                     variant="outlined"
                     sx={{
                        mt: 2,
                        bgcolor: 'transparent',
                        borderColor: '#5B85AA',
                        color: '#5B85AA',
                        '&:hover': {
                           borderColor: '#2E5077',
                           bgcolor: 'rgba(91, 133, 170, 0.1)',
                        }
                     }}
                  >
                     Recomeçar
                  </Button>
               </Box>
            ) : (
               <Box sx={{ mt: 2, mb: 2 }}>
                  {activeStep === 0 ? (
                     <ClientForm
                        handleSubmit={handleClientSubmit}
                        isLoading={isLoading}
                        submitting={submitting}
                        activeStep={activeStep}
                        steps={steps}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        clientName={clientName}
                        setClientName={setClientName}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        address={address}
                        setAddress={setAddress}
                        postalCode={postalCode}
                        setPostalCode={setPostalCode}
                        nif={nif}
                        setNif={setNif}
                        clientNumber={clientNumber}
                        setClientNumber={setClientNumber}
                        clientList={clientList}
                        clientListOptions={clientListOptions}
                        setExistingClientSelected={setExistingClientSelected}
                        clientData={clientData}
                        setClientData={setClientData}
                        inputsDisabled={inputsDisabled}
                        setInputsDisabled={setInputsDisabled}
                        selectedClientOption={selectedClientOption}
                        setSelectedClientOption={setSelectedClientOption}
                     />
                  ) : (
                     <EquipmentForm
                        handleSubmit={handleEquipmentSubmit}
                        handleBack={handleBack}
                        isLoading={isLoading}
                        submitting={submitting}
                        receivedDate={receivedDate}
                        setReceivedDate={setReceivedDate}
                        breakdown={breakdown}
                        setBreakdown={setBreakdown}
                        documentNumber={documentNumber}
                        setDocumentNumber={setDocumentNumber}
                        name={name}
                        setName={setName}
                        productNumber={productNumber}
                        setProductNumber={setProductNumber}
                        serialNumber={serialNumber}
                        setSerialNumber={setSerialNumber}
                        observations={observations}
                        setObservations={setObservations}
                        warranty={warranty}
                        setWarranty={setWarranty}
                        warrantyDate={warrantyDate}
                        setWarrantyDate={setWarrantyDate}
                        receiptNumber={receiptNumber}
                        setReceiptNumber={setReceiptNumber}
                        status={status}
                        setStatus={setStatus}
                        steps={steps}
                     />
                  )}
               </Box>
            )}
         </Paper>
      </Container>
   );
}
