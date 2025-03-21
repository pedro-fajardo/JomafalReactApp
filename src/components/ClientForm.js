// EquipmentForm.js
import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import Select from "react-select";
import {
   Box,
   Button,
   CircularProgress,
   styled,
   TextField,
   InputAdornment,
   Paper,
   Typography,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import BadgeIcon from '@mui/icons-material/Badge';
import TagIcon from '@mui/icons-material/Tag';

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

function ClientForm(props) {
   const onChangeClientOption = (selectedClient) => {
      if (selectedClient === null) {
         props.setClientName("");
         props.setPhoneNumber("");
         props.setAddress("");
         props.setPostalCode("");
         props.setInputsDisabled(false);
         props.setExistingClientSelected(false);
      } else {
         var selectedClientElement = props.clientList.find((client) => {
            if (client.id === selectedClient.value) {
               return client;
            }
         });

         props.setClientName(selectedClientElement.name);
         props.setPhoneNumber(selectedClientElement.phoneNumber);
         props.setAddress(selectedClientElement.address);
         props.setPostalCode(selectedClientElement.postalCode);
         props.setNif(selectedClientElement.nif);
         props.setClientNumber(selectedClientElement.clientNumber);
         props.setClientData(selectedClientElement);
         props.setSelectedClientOption({ value: selectedClientElement.id, label: selectedClientElement.name });
         props.setInputsDisabled(true);
         props.setExistingClientSelected(true);
      }
   };

   const handlePhoneNumber = (value) => {
      const max = 999999999;
      const maxLength = max.toString().length;
      const newVal =
         value < max
            ? value
            : parseInt(value.toString().substring(0, maxLength));

      props.setPhoneNumber(newVal);
   };

   const selectStyles = {
      control: (base) => ({
         ...base,
         height: 56,
         minHeight: 56,
         borderColor: '#e0e0e0',
         boxShadow: 'none',
         '&:hover': {
            borderColor: '#5B85AA',
         }
      }),
      option: (base, state) => ({
         ...base,
         backgroundColor: state.isSelected
            ? '#5B85AA'
            : state.isFocused
               ? 'rgba(91, 133, 170, 0.1)'
               : base.backgroundColor,
         '&:hover': {
            backgroundColor: state.isSelected
               ? '#5B85AA'
               : 'rgba(91, 133, 170, 0.1)',
         }
      }),
      placeholder: (base) => ({
         ...base,
         color: '#757575',
      }),
      indicatorSeparator: () => ({
         display: 'none'
      })
   };

   return (
      <Form id="client-form" onSubmit={props.handleSubmit}>
         <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" color="#2E5077" gutterBottom>
               Selecione um cliente existente
            </Typography>

            <Box sx={{ mb: 2 }}>
               <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Cliente
               </Typography>

               {props.selectedClientOption.value !== null ?
                  <Select
                     defaultValue={props.selectedClientOption}
                     className="basic-single"
                     classNamePrefix="select"
                     isClearable={true}
                     isSearchable={true}
                     name="clientList"
                     placeholder="Selecione um cliente..."
                     options={props.clientListOptions}
                     onChange={(e) => onChangeClientOption(e)}
                     styles={selectStyles}
                  />
                  :
                  <Select
                     className="basic-single"
                     classNamePrefix="select"
                     isClearable={true}
                     isSearchable={true}
                     name="clientList"
                     placeholder="Selecione um cliente..."
                     options={props.clientListOptions}
                     onChange={(e) => onChangeClientOption(e)}
                     styles={selectStyles}
                  />
               }
            </Box>

            <Typography variant="body2" color="text.secondary">
               Escolha um cliente existente ou preencha os campos abaixo para registar um novo cliente.
            </Typography>
         </Paper>

         <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" color="#2E5077" gutterBottom>
               {props.existingClientSelected ? 'Detalhes do cliente' : 'Registar novo cliente'}
            </Typography>

            <Box sx={{ mb: 3 }}>
               <StyledTextField
                  fullWidth
                  label="Nome"
                  variant="outlined"
                  disabled={props.inputsDisabled}
                  value={props.clientName}
                  onChange={(e) => props.setClientName(e.target.value)}
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
                  disabled={props.inputsDisabled}
                  value={props.address}
                  onChange={(e) => props.setAddress(e.target.value)}
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
                        disabled={props.inputsDisabled}
                        value={props.phoneNumber}
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
                        disabled={props.inputsDisabled}
                        value={props.postalCode}
                        onChange={(e) => props.setPostalCode(e.target.value)}
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
                        disabled={props.inputsDisabled}
                        value={props.nif}
                        onChange={(e) => props.setNif(e.target.value)}
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
                        disabled={props.inputsDisabled}
                        value={props.clientNumber}
                        onChange={(e) => props.setClientNumber(e.target.value)}
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

         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <SecondaryButton
               variant="outlined"
               disabled={props.activeStep === 0 || props.submitting}
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
               ) : (
                  props.activeStep === props.steps.length - 1 ? 'Concluir' : 'Avançar'
               )}
            </PrimaryButton>
         </Box>
      </Form>
   );
}

export default ClientForm;
