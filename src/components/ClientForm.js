// EquipmentForm.js
import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Label } from "reactstrap";
import { Spinner } from "react-bootstrap";
import Box from "@mui/material/Box";
import Select from "react-select";

function ClientForm(props) {
   const [inputsDisabled, setInputsDisabled] = useState(false);

   const onChangeClientOption = (selectedClient) => {
      if (selectedClient === null) {
         props.setClientName("");
         props.setPhoneNumber("");
         props.setAddress("");
         setInputsDisabled(false);
         props.setExistingClientSelected(false);
      } else {
         console.log(selectedClient);
         var selectedClientElement = props.clientList.find((client) => {
            if (client.id === selectedClient.value) {
               return client;
            }
         });

         props.setClientName(selectedClientElement.name);
         props.setPhoneNumber(selectedClientElement.phoneNumber);
         props.setAddress(selectedClientElement.address);
         props.setClientData(selectedClientElement);
         setInputsDisabled(true);
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
         <Form.Group
            style={{ paddingTop: "1%", paddingBottom: "1%" }}
            controlId="clientName"
         >
            <Form.Label>Nome</Form.Label>
            <Form.Control
               disabled={inputsDisabled}
               type="text"
               value={props.clientName}
               onChange={(e) => props.setClientName(e.target.value)}
            />
         </Form.Group>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="clientAddress">
            <Form.Label>Morada</Form.Label>
            <Form.Control
               disabled={inputsDisabled}
               type="text"
               value={props.address}
               onChange={(e) => props.setAddress(e.target.value)}
            />
         </Form.Group>
         <Row>
            <Col>
               <Label>Nº de Telemóvel</Label>
               <Form.Control
                  disabled={inputsDisabled}
                  type="number"
                  value={props.phoneNumber}
                  onChange={(e) => handlePhoneNumber(e.target.value)}
               />
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
