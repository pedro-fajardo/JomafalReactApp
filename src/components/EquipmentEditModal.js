import React, { useState, useEffect } from "react";
import "dayjs/locale/en-gb";
import { Form, Col, Row, Table } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "react-bootstrap/Modal";
import {
   Box,
   Button,
   styled,
   TextField,
   Paper,
   Typography,
   InputAdornment,
   FormControlLabel,
   Radio,
   RadioGroup,
   Select,
   MenuItem,
} from "@mui/material";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import pdf from "../pdf/Ficha ASJ.pdf";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import DevicesIcon from '@mui/icons-material/Devices';
import CodeIcon from '@mui/icons-material/Code';
import SerialNumberIcon from '@mui/icons-material/Pin';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BuildIcon from '@mui/icons-material/Build';
import NotesIcon from '@mui/icons-material/Notes';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import BadgeIcon from '@mui/icons-material/Badge';
import TagIcon from '@mui/icons-material/Tag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
   },
   '& .MuiInputBase-multiline': {
      height: 'auto',
   }
});

// Custom styled Select
const StyledSelect = styled(Select)({
   height: '56px',
   '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#5B85AA',
   },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#5B85AA',
   }
});

function EquipmentEditModal({
   setIsToRefreshData,
   isEditModalVisible,
   setIsEditModalVisible,
   equipmentId,
}) {
   const [receivedDate, setReceivedDate] = useState(null);
   const [documentNumber, setDocumentNumber] = useState("");
   const [productNumber, setProductNumber] = useState("");
   const [serialNumber, setSerialNumber] = useState("");
   const [name, setName] = useState("");
   const [breakdown, setBreakdown] = useState("");
   const [observations, setObservations] = useState("");
   const [status, setStatus] = useState("");
   const [warranty, setWarranty] = useState(true);
   const [warrantyDate, setWarrantyDate] = useState("");
   const [receiptNumber, setReceiptNumber] = useState("");

   const [address, setAddress] = useState("");
   const [phoneNumber, setPhoneNumber] = useState(0);
   const [clientName, setClientName] = useState("");
   const [clientId, setClientId] = useState("");
   const [postalCode, setPostalCode] = useState("");
   const [nif, setNif] = useState("");
   const [clientNumber, setClientNumber] = useState("");

   const [parts, setParts] = useState([]);
   const [iva, setIva] = useState(0);
   const [baseValue, setBaseValue] = useState(0);

   const [totalValue, setTotalValue] = useState(0);

   const getEquipment = async () => {
      const { data } = await axios.get("/api/equipment/" + equipmentId + "/");

      setName(data.name);
      setSerialNumber(data.serialNumber);
      setProductNumber(data.productNumber);
      setBreakdown(data.breakdown);
      setDocumentNumber(data.documentNumber);
      setObservations(data.observations);
      setStatus(data.status);
      setWarranty(data.warranty);
      setWarrantyDate(data.warrantyDate);
      setReceiptNumber(data.receiptNumber);
      setReceivedDate(data.receivedDate);
      setAddress(data.client.address);
      setPhoneNumber(data.client.phoneNumber);
      setClientName(data.client.name);
      setClientId(data.client.id);
      setNif(data.client.nif);
      setClientNumber(data.client.clientNumber);
      setPostalCode(data.client.postalCode);
      setParts(data.parts === null ? [] : data.parts);

      setIva(parseFloat(data.partsIva));
   };

   const updateEquipmentAndClient = async (e) => {
      e.preventDefault();
      await axios
         .put("/api/equipment/" + equipmentId + "/", {
            name: name,
            serialNumber: serialNumber,
            productNumber: productNumber,
            breakdown: breakdown,
            observations: observations,
            documentNumber: documentNumber,
            receivedDate: receivedDate,
            status: status,
            warranty: warranty,
            warrantyDate: warrantyDate,
            receiptNumber: receiptNumber,
            partsIva: "" + (Number.isNaN(iva) ? "0" : iva),
            client: {
               name: clientName,
               phoneNumber: phoneNumber,
               address: address,
               postalCode: postalCode,
               nif: nif,
               clientNumber: clientNumber,
            },
            parts: parts.filter(part => (part.description || part.code) !== ""),
         })
         .then((response) => {
            closeModal();
            setIsToRefreshData(true);
         });
   };

   useEffect(() => {
      getEquipment();
   }, []);

   useEffect(() => {
      calculateBaseValue();
   }, [parts]);

   useEffect(() => {
      console.log(baseValue, iva);
      setTotalValue((baseValue * (100 + iva)) / 100);
   }, [iva, baseValue]);

   const calculateBaseValue = () => {
      const total = parts.reduce(
         (sum, part) => sum + parseFloat(part.value * part.quantity || 0),
         0
      );
      setBaseValue(total);
   };

   const addPart = () => {
      setParts([
         ...parts,
         { code: "", quantity: 1, description: "", value: 0 },
      ]);
   };

   const updatePart = (index, field, value) => {
      const updatedParts = parts.map((part, i) =>
         i === index ? { ...part, [field]: value } : part
      );
      setParts(updatedParts);
   };

   const deletePart = (index) => {
      // Create a new array excluding the part at the specified index
      const newParts = parts.filter((_, i) => i !== index);
      setParts(newParts); // Update the state with the new parts array
   }

   const closeModal = () => {
      setIsEditModalVisible(false);
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

   const printPDF = async () => {
      const formPdfBytes = await fetch(pdf).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const form = pdfDoc.getForm();

      const receivedDateConverted = new Date(receivedDate);

      form.getTextField("clientName").setText(clientName);
      form.getTextField("clientAddress").setText(address);
      form.getTextField("clientPostalCode").setText(postalCode);
      form.getTextField("clientPhoneNumber").setText("" + phoneNumber);
      form.getTextField("clientNif").setText("" + nif);
      form.getTextField("clientNumber").setText("" + clientNumber);
      form.getTextField("equipmentPNC").setText("" + productNumber);
      form.getTextField("equipmentName").setText(name);
      form.getTextField("equipmentSerialNumber").setText("" + serialNumber);
      form.getTextField("equipmentBreakdown").setText(breakdown);
      form.getTextField("equipmentObservations").setText(observations);
      form.getTextField("documentNumber").setText("" + documentNumber);
      form
         .getTextField("date")
         .setText(
            receivedDateConverted.getDate() +
            "/" +
            receivedDateConverted.getMonth() +
            "/" +
            receivedDateConverted.getFullYear() +
            " " +
            +receivedDateConverted.getHours() +
            ":" +
            receivedDateConverted.getMinutes()
         );

      if (warranty) {
         form.getCheckBox("equipmentWarrantyYes").check();
         form.getTextField("equipmentReceiptNumber").setText("" + receiptNumber);
          form.getTextField("equipmentWarrantyDate").setText("" + warrantyDate);
      } else {
         form.getCheckBox("equipmentWarrantyNo").check();
      }

      if (!parts.empty) {
         parts.forEach((part, index) => {
            form.getTextField("codeRow" + (index + 1)).setText("" + part.code);
            form.getTextField("quantityRow" + (index + 1)).setText("" + part.quantity);
            form.getTextField("descriptionRow" + (index + 1)).setText("" + part.description);
            form.getTextField("valueRow" + (index + 1)).setText("" + part.value);
         });

         form.getTextField("baseValue").setText("" + baseValue);
         form.getTextField("IVA").setText("" + iva);
         form.getTextField("TotalValue").setText("" + totalValue.toFixed(2));
      }

      form.flatten();

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes]);
      const fileUrl = window.URL.createObjectURL(blob);

      let alink = document.createElement("a");
      alink.href = fileUrl;
      alink.download = `ASJ - Ficha de Atendimento ${clientName}.pdf`;
      alink.click();
   };

   return (
      <Modal
         size="xl"
         show={isEditModalVisible}
         onHide={() => setIsEditModalVisible(false)}
         backdrop="static"
         aria-labelledby="example-modal-sizes-title-lg"
         centered
      >
         <Modal.Header closeButton>
            <Typography variant="h5" color="#2E5077">Editar Equipamento/Cliente</Typography>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={updateEquipmentAndClient}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" color="#2E5077">
                     Equipamento
                  </Typography>
                  <PrimaryButton
                     variant="contained"
                     onClick={printPDF}
                     startIcon={<PrintIcon />}
                  >
                     PDF
                  </PrimaryButton>
               </Box>

               <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Row className="mb-4">
                     <Col>
                        <StyledTextField
                           fullWidth
                           label="Nome do Equipamento"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <DevicesIcon color="action" />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Col>
                     <Col>
                        <StyledSelect
                           fullWidth
                           value={status}
                           onChange={(e) => setStatus(e.target.value)}
                           label="Estado do equipamento"
                        >
                           <MenuItem value="new">Novo</MenuItem>
                           <MenuItem value="repairing">Em Reparação</MenuItem>
                           <MenuItem value="waiting parts">À Espera de Peças</MenuItem>
                           <MenuItem value="repaired">Reparado</MenuItem>
                           <MenuItem value="recycle">Reciclagem</MenuItem>
                        </StyledSelect>
                     </Col>
                  </Row>

                  <Row className="mb-4">
                     <Col>
                        <StyledTextField
                           fullWidth
                           label="PNC"
                           value={productNumber}
                           onChange={(e) => setProductNumber(e.target.value)}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <CodeIcon color="action" />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Col>
                     <Col>
                        <StyledTextField
                           fullWidth
                           label="SN"
                           value={serialNumber}
                           onChange={(e) => setSerialNumber(e.target.value)}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <SerialNumberIcon color="action" />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Col>
                  </Row>

                  <Box sx={{ mb: 3 }}>
                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Garantia
                     </Typography>
                     <RadioGroup
                        row
                        value={warranty}
                        onChange={(e) => setWarranty(e.target.value === 'true')}
                     >
                        <FormControlLabel
                           value={true}
                           control={<Radio sx={{
                              '&.Mui-checked': {
                                 color: '#5B85AA',
                              },
                           }} />}
                           label="Sim"
                        />
                        <FormControlLabel
                           value={false}
                           control={<Radio sx={{
                              '&.Mui-checked': {
                                 color: '#5B85AA',
                              },
                           }} />}
                           label="Não"
                        />
                     </RadioGroup>
                  </Box>

                  {warranty && (
                     <Row className="mb-4">
                        <Col>
                           <StyledTextField
                              fullWidth
                              label="Nº Fatura"
                              value={receiptNumber}
                              disabled={!warranty}
                              onChange={(e) => setReceiptNumber(e.target.value)}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <ReceiptIcon color="action" />
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        </Col>
                        <Col>
                           <StyledTextField
                              fullWidth
                              label="Data da Garantia"
                              type="date"
                              value={warrantyDate}
                              disabled={!warranty}
                              onChange={(e) => setWarrantyDate(e.target.value)}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <VerifiedIcon color="action" />
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        </Col>
                     </Row>
                  )}

                  <Box sx={{ mb: 3 }}>
                     <StyledTextField
                        fullWidth
                        label="Descrição da Avaria"
                        multiline
                        rows={4}
                        value={breakdown}
                        onChange={(e) => setBreakdown(e.target.value)}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                 <BuildIcon color="action" />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                     <StyledTextField
                        fullWidth
                        label="Observações"
                        multiline
                        rows={3}
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                 <NotesIcon color="action" />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Box>
               </Paper>

               <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Typography variant="h6" color="#2E5077" gutterBottom>
                     Lista de Peças
                  </Typography>

                  <Box sx={{
                     border: '1px solid #e0e0e0',
                     borderRadius: 1,
                     overflow: 'hidden',
                     mb: 3
                  }}>
                     <Table>
                        <thead>
                           <tr style={{ backgroundColor: '#f5f5f5' }}>
                              <th style={{
                                 padding: '16px',
                                 borderBottom: '2px solid #e0e0e0',
                                 color: '#2E5077',
                                 fontWeight: 600,
                                 width: '20%'
                              }}>Código</th>
                              <th style={{
                                 padding: '16px',
                                 borderBottom: '2px solid #e0e0e0',
                                 color: '#2E5077',
                                 fontWeight: 600,
                                 width: '15%'
                              }}>Quantidade</th>
                              <th style={{
                                 padding: '16px',
                                 borderBottom: '2px solid #e0e0e0',
                                 color: '#2E5077',
                                 fontWeight: 600,
                                 width: '40%'
                              }}>Descrição</th>
                              <th style={{
                                 padding: '16px',
                                 borderBottom: '2px solid #e0e0e0',
                                 color: '#2E5077',
                                 fontWeight: 600,
                                 width: '15%'
                              }}>Valor (€)</th>
                              <th style={{
                                 padding: '16px',
                                 borderBottom: '2px solid #e0e0e0',
                                 color: '#2E5077',
                                 fontWeight: 600,
                                 width: '10%'
                              }}>Ação</th>
                           </tr>
                        </thead>
                        <tbody>
                           {parts && parts.map((part, index) => (
                              <tr key={index} style={{
                                 backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa'
                              }}>
                                 <td style={{ padding: '8px 16px' }}>
                                    <StyledTextField
                                       fullWidth
                                       size="small"
                                       value={part.code}
                                       onChange={(e) => updatePart(index, "code", e.target.value)}
                                       placeholder="Código"
                                       sx={{
                                          '& .MuiOutlinedInput-root': {
                                             backgroundColor: '#ffffff'
                                          }
                                       }}
                                    />
                                 </td>
                                 <td style={{ padding: '8px 16px' }}>
                                    <StyledTextField
                                       fullWidth
                                       size="small"
                                       type="number"
                                       value={part.quantity}
                                       onChange={(e) => updatePart(index, "quantity", e.target.value)}
                                       placeholder="Qtd."
                                       sx={{
                                          '& .MuiOutlinedInput-root': {
                                             backgroundColor: '#ffffff'
                                          }
                                       }}
                                    />
                                 </td>
                                 <td style={{ padding: '8px 16px' }}>
                                    <StyledTextField
                                       fullWidth
                                       size="small"
                                       value={part.description}
                                       onChange={(e) => updatePart(index, "description", e.target.value)}
                                       placeholder="Descrição da peça"
                                       sx={{
                                          '& .MuiOutlinedInput-root': {
                                             backgroundColor: '#ffffff'
                                          }
                                       }}
                                    />
                                 </td>
                                 <td style={{ padding: '8px 16px' }}>
                                    <StyledTextField
                                       fullWidth
                                       size="small"
                                       type="number"
                                       value={part.value}
                                       onChange={(e) => updatePart(index, "value", parseFloat(e.target.value))}
                                       placeholder="0.00"
                                       sx={{
                                          '& .MuiOutlinedInput-root': {
                                             backgroundColor: '#ffffff'
                                          }
                                       }}
                                    />
                                 </td>
                                 <td style={{ padding: '8px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
                                    <Button
                                       onClick={() => deletePart(index)}
                                       color="error"
                                       sx={{
                                          minWidth: '32px',
                                          height: '32px',
                                          padding: 0,
                                          borderRadius: '4px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          '&:hover': {
                                             backgroundColor: 'rgba(211, 47, 47, 0.04)'
                                          }
                                       }}
                                    >
                                       <DeleteIcon sx={{ fontSize: 20 }} />
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                           {parts.length === 0 && (
                              <tr>
                                 <td colSpan={5} style={{
                                    padding: '24px',
                                    textAlign: 'center',
                                    color: '#666',
                                    backgroundColor: '#fafafa'
                                 }}>
                                    Nenhuma peça adicionada
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </Table>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                     <SecondaryButton
                        variant="outlined"
                        onClick={addPart}
                        size="large"
                        startIcon={<i className="fas fa-plus" />}
                     >
                        Adicionar Peça
                     </SecondaryButton>

                     <Box sx={{
                        display: 'flex',
                        gap: 2,
                        width: '60%'
                     }}>
                        <StyledTextField
                           fullWidth
                           label="Valor Base (€)"
                           value={baseValue.toFixed(2)}
                           InputProps={{
                              readOnly: true,
                              startAdornment: (
                                 <InputAdornment position="start">€</InputAdornment>
                              ),
                           }}
                        />
                        <StyledTextField
                           fullWidth
                           label="IVA (%)"
                           type="number"
                           value={iva}
                           onChange={(e) => setIva(parseFloat(e.target.value))}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">%</InputAdornment>
                              ),
                           }}
                        />
                        <StyledTextField
                           fullWidth
                           label="Valor Total (€)"
                           value={totalValue.toFixed(2)}
                           InputProps={{
                              readOnly: true,
                              startAdornment: (
                                 <InputAdornment position="start">€</InputAdornment>
                              ),
                           }}
                        />
                     </Box>
                  </Box>
               </Paper>

               <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Typography variant="h6" color="#2E5077" gutterBottom>
                     Cliente
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                     <StyledTextField
                        fullWidth
                        label="Nome"
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

                  <Row className="mb-4">
                     <Col>
                        <StyledTextField
                           fullWidth
                           label="Nº de Telemóvel"
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
                     </Col>
                     <Col>
                        <StyledTextField
                           fullWidth
                           label="Código Postal"
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
                     </Col>
                  </Row>

                  <Row className="mb-4">
                     <Col>
                        <StyledTextField
                           fullWidth
                           label="NIF"
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
                     </Col>
                     <Col>
                        <StyledTextField
                           fullWidth
                           label="Nº Cliente Jomafal"
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
                     </Col>
                  </Row>
               </Paper>

               <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Typography variant="h6" color="#2E5077" gutterBottom>
                     Informações do atendimento
                  </Typography>

                  <Row className="mb-4">
                     <Col>
                        <Box sx={{ mb: 2 }}>
                           <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Data e Hora de atendimento
                           </Typography>
                           <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              adapterLocale={"en-gb"}
                           >
                              <DateTimePicker
                                 onChange={(value) => setReceivedDate(value)}
                                 value={dayjs(receivedDate)}
                                 slotProps={{
                                    textField: {
                                       variant: "outlined",
                                       fullWidth: true,
                                       sx: {
                                          '& .MuiOutlinedInput-root': {
                                             height: '56px',
                                             '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#5B85AA',
                                             },
                                             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#5B85AA',
                                             }
                                          },
                                          '& .MuiFormLabel-root.Mui-focused': {
                                             color: '#5B85AA',
                                          }
                                       },
                                       InputProps: {
                                          startAdornment: (
                                             <InputAdornment position="start">
                                                <CalendarTodayIcon color="action" />
                                             </InputAdornment>
                                          ),
                                          placeholder: ""
                                       }
                                    }
                                 }}
                                 orientation="landscape"
                                 views={["year", "month", "day", "hours", "minutes"]}
                              />
                           </LocalizationProvider>
                        </Box>
                     </Col>
                     <Col>
                        <Box sx={{ mb: 2 }}>
                           <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Documento Nº
                           </Typography>
                           <StyledTextField
                              fullWidth
                              placeholder="Introduza o número do documento"
                              variant="outlined"
                              value={documentNumber}
                              onChange={(e) => setDocumentNumber(e.target.value)}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <AssignmentIcon color="action" />
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        </Box>
                     </Col>
                  </Row>
               </Paper>

               <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                  <PrimaryButton
                     variant="contained"
                     type="submit"
                     size="large"
                  >
                     Guardar Alterações
                  </PrimaryButton>
               </Box>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default EquipmentEditModal;
