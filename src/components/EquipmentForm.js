// EquipmentForm.js
import React from "react";
import "dayjs/locale/en-gb";
import { Form, Col, Row } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
   Box,
   Button,
   CircularProgress,
   styled,
   TextField,
   FormControlLabel,
   Radio,
   RadioGroup,
   Paper,
   Typography,
   InputAdornment,
} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DevicesIcon from '@mui/icons-material/Devices';
import CodeIcon from '@mui/icons-material/Code';
import SerialNumberIcon from '@mui/icons-material/Pin';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BuildIcon from '@mui/icons-material/Build';
import NotesIcon from '@mui/icons-material/Notes';
import VerifiedIcon from '@mui/icons-material/Verified';

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

function EquipmentForm(props) {
   return (
      <Form id="equipment-form" onSubmit={props.handleSubmit}>
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
                           onChange={(value) => props.setReceivedDate(value)}
                           value={props.receivedDate}
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
                                 },
                                 placeholder: ""
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
                        value={props.documentNumber}
                        onChange={(e) => props.setDocumentNumber(e.target.value)}
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

         <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" color="#2E5077" gutterBottom>
               Dados do Equipamento
            </Typography>

            <Box sx={{ mb: 3 }}>
               <StyledTextField
                  fullWidth
                  label="Nome do Equipamento"
                  variant="outlined"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <DevicesIcon color="action" />
                        </InputAdornment>
                     ),
                  }}
               />
            </Box>

            <Row className="mb-4">
               <Col>
                  <Box sx={{ mb: 3 }}>
                     <StyledTextField
                        fullWidth
                        label="PNC (Código do produto)"
                        variant="outlined"
                        value={props.productNumber}
                        onChange={(e) => props.setProductNumber(e.target.value)}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <CodeIcon color="action" />
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
                        label="Número de Série (SN)"
                        variant="outlined"
                        value={props.serialNumber}
                        onChange={(e) => props.setSerialNumber(e.target.value)}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <SerialNumberIcon color="action" />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Box>
               </Col>
            </Row>

            <Box sx={{ mb: 3 }}>
               <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Garantia
               </Typography>
               <RadioGroup
                  row
                  value={props.warranty}
                  onChange={(e) => props.setWarranty(e.target.value === 'true')}
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

            {props.warranty && (
               <Row className="mb-4">
                  <Col>
                     <Box sx={{ mb: 3 }}>
                        <StyledTextField
                           fullWidth
                           label="Nº Fatura"
                           variant="outlined"
                           disabled={!props.warranty}
                           value={props.receiptNumber}
                           onChange={(e) => props.setReceiptNumber(e.target.value)}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <ReceiptIcon color="action" />
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
                           label="Data da Garantia"
                           type="date"
                           variant="outlined"
                           disabled={!props.warranty}
                           value={props.warrantyDate || ''}
                           onChange={(e) => props.setWarrantyDate(e.target.value)}
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
                     </Box>
                  </Col>
               </Row>
            )}

            <Box sx={{ mb: 3 }}>
               <StyledTextField
                  fullWidth
                  label="Descrição da Avaria"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={props.breakdown}
                  onChange={(e) => props.setBreakdown(e.target.value)}
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
                  variant="outlined"
                  multiline
                  rows={3}
                  value={props.observations}
                  onChange={(e) => props.setObservations(e.target.value)}
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

         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <SecondaryButton
               variant="outlined"
               disabled={props.submitting}
               onClick={props.handleBack}
               size="large"
            >
               Voltar
            </SecondaryButton>

            <PrimaryButton
               variant="contained"
               type="submit"
               disabled={props.submitting || props.isLoading}
               size="large"
            >
               {props.submitting ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
               ) : "Finalizar"}
            </PrimaryButton>
         </Box>
      </Form>
   );
}

export default EquipmentForm;
