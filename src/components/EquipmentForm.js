// EquipmentForm.js
import React from "react";
import "dayjs/locale/en-gb";
import { Form, Button, Col, Row } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Label } from "reactstrap";
import { Spinner } from "react-bootstrap";
import Box from "@mui/material/Box";
   
function EquipmentForm(props) {
   return (
      <Form  onSubmit={props.handleSubmit}>
         <Row style={{ paddingTop: '1%', paddingBottom: "1%" }}>
            <Col>
               <Label>Data e Hora de atendimento</Label>
               <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={"en-gb"}
               >
                  <DateTimePicker
                     onChange={(value) => props.setReceivedDate(value)
                     }
                     value={props.receivedDate}
                     slotProps={{ textField: { size: "small" } }}
                     orientation="landscape"
                     views={["year", "month", "day", "hours", "minutes"]}
                  />
               </LocalizationProvider>
            </Col>
            <Col></Col>
            <Col>
               <Form.Group
                  style={{ paddingBottom: "1%" }}
                  controlId="documentNumber"
               >
                  <Form.Label>Documento Nº</Form.Label>
                  <Form.Control
                     type="text"
                     value={props.documentNumber}
                     onChange={(e) => props.setDocumentNumber(e.target.value)}
                  />
               </Form.Group>
            </Col>
            <Col></Col>
         </Row>
         <hr></hr>

         <h3>Equipamento</h3>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
               type="text"
               value={props.name}
               onChange={(e) => props.setName(e.target.value)}
            />
         </Form.Group>
         <Row style={{ paddingBottom: "1%" }}>
            <Col>
               <Form.Group controlId="productNumber">
                  <Form.Label>PNC</Form.Label>
                  <Form.Control
                     type="text"
                     value={props.productNumber}
                     onChange={(e) => props.setProductNumber(e.target.value)}
                  />
               </Form.Group>
            </Col>
            <Col>
               <Form.Group controlId="serialNumber">
                  <Form.Label>SN</Form.Label>
                  <Form.Control
                     type="text"
                     value={props.serialNumber}
                     onChange={(e) => props.setSerialNumber(e.target.value)}
                  />
               </Form.Group>
            </Col>
         </Row>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="breakdown">
            <Form.Label>Avaria</Form.Label>
            <Form.Control
               as="textarea"
               rows={4}
               value={props.breakdown}
               onChange={(e) => props.setBreakdown(e.target.value)}
            />
         </Form.Group>
         <Form.Group controlId="observations">
            <Form.Label>Observações</Form.Label>
            <Form.Control
               as="textarea"
               rows={2}
               value={props.observations}
               onChange={(e) => props.setObservations(e.target.value)}
            />
         </Form.Group>
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

export default EquipmentForm;
