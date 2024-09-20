// EquipmentForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Label } from "reactstrap";
import { Spinner } from "react-bootstrap";
import Box from "@mui/material/Box";
import Select from "react-select";

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
         props.setClientData(selectedClientElement);
         props.setSelectedClientOption({value: selectedClientElement.id, label: selectedClientElement.name});
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

   return (
      <Form onSubmit={props.handleSubmit}>
         <br></br>
         <Form.Group>
            <Form.Label>Lista de Clientes Existentes:</Form.Label>
            { props.selectedClientOption.value !== null ?
               <Select
                  defaultValue={props.selectedClientOption}
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="clientList"
                  placeholder="Selecione..."
                  options={props.clientListOptions}
                  onChange={(e) => onChangeClientOption(e)}
               />
               :
               <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="clientList"
                  placeholder="Selecione..."
                  options={props.clientListOptions}
                  onChange={(e) => onChangeClientOption(e)}
               />
            }
         </Form.Group>
         <hr></hr>
         <Form.Group
            style={{ paddingTop: "1%", paddingBottom: "1%" }}
            controlId="clientName"
         >
            <Form.Label>Nome</Form.Label>
            <Form.Control
               disabled={props.inputsDisabled}
               type="text"
               value={props.clientName}
               onChange={(e) => props.setClientName(e.target.value)}
            />
         </Form.Group>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="clientAddress">
            <Form.Label>Morada</Form.Label>
            <Form.Control
               disabled={props.inputsDisabled}
               type="text"
               value={props.address}
               onChange={(e) => props.setAddress(e.target.value)}
            />
         </Form.Group>
         <Row>
            <Col>
               <Form.Group style={{ paddingBottom: "1%" }} controlId="clientPhoneNumber">
                  <Form.Label>Nº de Telemóvel</Form.Label>
                  <Form.Control
                     disabled={props.inputsDisabled}
                     type="number"
                     value={props.phoneNumber}
                     onChange={(e) => handlePhoneNumber(e.target.value)}
                  />
               </Form.Group>
            </Col>
            <Col></Col>
            <Col>
               <Form.Group style={{ paddingBottom: "1%" }} controlId="clientPostalCode">
                  <Form.Label>Código de Postal</Form.Label>
                  <Form.Control
                     disabled={props.inputsDisabled}
                     type="text"
                     value={props.postalCode}
                     onChange={(e) => props.setPostalCode(e.target.value)}
                  />
               </Form.Group>
            </Col>
            <Col></Col>
         </Row>
         <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
               color="inherit"
               disabled={props.activeStep === 0}
               onClick={props.handleBack}
               sx={{ mr: 1 }}
            >
               Anterior
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button disabled={props.isLoading} type="submit">
               {props.isLoading && <Spinner as="span" animation="grow" />}
               {props.activeStep === props.steps.length - 1 ? "Finalizar" : "Proximo"}
            </Button>
         </Box>
      </Form>
   );
}

export default ClientForm;
