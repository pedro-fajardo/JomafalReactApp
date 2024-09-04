// EquipmentForm.js
import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { MuiTelInput } from "mui-tel-input";
import { Label } from "reactstrap";
import { Spinner } from "react-bootstrap";
import Box from "@mui/material/Box";
import Select from 'react-select';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function ClientForm(props) {
   const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(false);

   const onChangeClientOption = (selectedClient) => {
      const selectedClientElement = props.clientList.find((client) => {
         if (client.id = selectedClient.value) {
            return client;
         }
      })

      setPhoneNumberDisabled(true);
      props.setClientName(selectedClientElement.name);
      props.setPhoneNumber(selectedClientElement.phoneNumber);
      props.setAddress(selectedClientElement.address);
   };

   return (
      <Form onSubmit={props.handleSubmit}>
         <br></br>
         <Form.Group>
            <Form.Label>Lista de Clientes Existentes:</Form.Label>
            <Select
               className="basic-single"
               classNamePrefix="select"
               isClearable={true}
               isSearchable={true}
               name="clientList"
               options={props.clientListOptions}
               onChange={(e) => onChangeClientOption(e)}
            />
         </Form.Group>
         <br></br>
         <Form.Group style={{ paddingTop: '1%', paddingBottom: "1%" }} controlId="clientName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
               type="text"
               value={props.clientName}
               onChange={(e) => props.setClientName(e.target.value)}
            />
         </Form.Group>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="clientAddress">
            <Form.Label>Morada</Form.Label>
            <Form.Control
               type="text"
               value={props.address}
               onChange={(e) => props.setAddress(e.target.value)}
            />
         </Form.Group>
         <Row>
            <Col>
               <Label>Nº de Telemóvel</Label>
               {/*<MuiTelInput
                  size="small"
                  variant="outlined"
                  value={props.phoneNumber}
                  onChange={(value) => {props.setPhoneNumber(value)}}
                  forceCallingCode
                  defaultCountry="PT"
                  disableDropdown
                  disableFormatting
                  inputProps={{ maxLength: 9 }}
               ></MuiTelInput>*/}
               <PhoneInput
                  className="number"
                  country={"pt"}
                  value={props.phoneNumber}
                  onChange={(phone) =>
                     props.setPhoneNumber(phone)
                  } />
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
         </Row>
         <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
               color="inherit"
               disabled={props.activeStep === 0}
               onClick={props.handleBack}
               sx={{ mr: 1 }}
            >
               Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button disabled={props.isLoading} type="submit">
               {props.isLoading && <Spinner as="span" animation="grow" />}
               {props.activeStep === props.steps.length - 1 ? "Finish" : "Next"}
            </Button>
         </Box>
      </Form>
   );
}

export default ClientForm;
