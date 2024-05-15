// EquipmentForm.js
import React, { useState } from "react";
import { Form, Button, Dropdown, Col, Row } from "react-bootstrap";
import { MuiTelInput } from "mui-tel-input";
import { Label } from "reactstrap";
import { Spinner } from "react-bootstrap";
import Box from "@mui/material/Box";


function ClientForm(props) {
   return (
      <Form onSubmit={props.handleSubmit}>
         <Form.Group style={{ paddingTop:'1%', paddingBottom: "1%" }} controlId="clientName">
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
               <MuiTelInput
                  size="small"
                  variant="outlined"
                  value={props.phoneNumber}
                  onChange={props.setPhoneNumber}
                  forceCallingCode
                  defaultCountry="PT"
                  disableDropdown
                  disableFormatting
                  inputProps={{ maxLength: 9 }}
               ></MuiTelInput>
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
               { props.isLoading && <Spinner as="span" animation="grow" /> }
               {props.activeStep === props.steps.length - 1 ? "Finish" : "Next"}
            </Button>
         </Box>
      </Form>
   );
}

export default ClientForm;
