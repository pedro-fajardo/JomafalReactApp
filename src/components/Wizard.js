import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClientForm from "./ClientForm";
import EquipmentForm from "./EquipmentForm";
import { Spinner } from "react-bootstrap";

const steps = ["Escolher/Criar Cliente", "Equipamento para reparação"];

export default function Wizard() {
   const [isToCreate, setIsToCreate] = useState(false);
   const [receivedDate, setReceivedDate] = useState(null);
   const [documentNumber, setDocumentNumber] = useState("");
   const [productNumber, setProductNumber] = useState("");
   const [serialNumber, setSerialNumber] = useState("");
   const [name, setName] = useState("");
   const [breakdown, setBreakdown] = useState("");
   const [observations, setObservations] = useState("");
   const [status, setStatus] = useState("new");
   const [clientData, setClientData] = useState({});

   const putEquipment = async () => {
      await axios.post("/api/equipment", {
         name: name,
         serialNumber: serialNumber,
         productNumber: productNumber,
         breakdown: breakdown,
         observations: observations,
         documentNumber: documentNumber,
         receivedDate: receivedDate,
         client: clientData,
         status: status,
      });
   };

   const handleEquipmentSubmit = (e) => {
      e.preventDefault();
      putEquipment();
   };

   const [address, setAddress] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [clientName, setClientName] = useState("");

   const putClient = async () => {
      await axios
         .post("/api/client", {
            name: clientName,
            phoneNumber: parseInt(phoneNumber.slice(4, 14), 10),
            address: address,
         })
         .then((data) => {
            setClientData(data);
         });
   };

   const handleClientSubmit = (e) => {
      setIsLoading(true);
      e.preventDefault();
      putClient();
      setIsLoading(false);
      handleNext();
   };

   const [activeStep, setActiveStep] = useState(0);
   const [isLoading, setIsLoading] = useState(false)

   const handleNext = async() => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   return (
      <Box sx={{ width: "100%" }}>
         <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
               const stepProps = {};
               const labelProps = {};
               return (
                  <Step key={label} {...stepProps}>
                     <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
               );
            })}
         </Stepper>
         {activeStep === steps.length ? (
            <React.Fragment>
               <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
               </Typography>
               <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
               </Box>
            </React.Fragment>
         ) : (
            <React.Fragment>
               {activeStep === 0 ? (
                  <ClientForm
                     isToCreate={isToCreate}
                     handleSubmit={handleClientSubmit}
                     isLoading={isLoading}
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
                     putClient={putClient}
                  ></ClientForm>
               ) : (
                  <EquipmentForm
                     isToCreate={isToCreate}
                     handleSubmit={handleEquipmentSubmit}
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
                  ></EquipmentForm>
               )}
            </React.Fragment>
         )}
      </Box>
   );
}
