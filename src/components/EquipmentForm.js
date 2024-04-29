// EquipmentForm.js
import React, { useState } from "react";
import axios from "axios";
import "dayjs/locale/en-gb";
import { Form, Button, Dropdown, Col, Row } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiTelInput } from "mui-tel-input";
import { Label } from "reactstrap";

function EquipmentForm({ setModalVisible }) {
   const [receivedDate, setReceivedDate] = useState(null);
   const [documentNumber, setDocumentNumber] = useState("");
   const [address, setAddress] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [clientName, setClientName] = useState("");
   const [productNumber, setProductNumber] = useState("");
   const [serialNumber, setSerialNumber] = useState("");
   const [name, setName] = useState("");
   const [breakdown, setBreakdown] = useState("");
   const [observations, setObservations] = useState("");
   const [status, setStatus] = useState("new");

   const putClientAndEquipent = async () => {
      await axios.post('/api/client',
         {
            name: clientName,
            phoneNumber: parseInt(phoneNumber.slice(4,14),10),
            address: address
         }).then((data) => {
            axios.post('/api/equipment',
               {
                  name: name,
                  serialNumber: serialNumber,
                  productNumber: productNumber,
                  breakdown: breakdown,
                  observations: observations,
                  documentNumber: documentNumber,
                  receivedDate: receivedDate,
                  client: data,
                  status: status,
               }
            );
            setModalVisible(false);
         }
      );

   };

   const handleSubmit = (e) => {
      e.preventDefault();
      putClientAndEquipent();
   };

   return (
      <Form onSubmit={handleSubmit}>
         <Row style={{ paddingBottom: "1%" }}>
            <Col>
               <Label>Data e Hora de atendimento</Label>
               <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={"en-gb"}
               >
                  <DateTimePicker
                     onChange={(value) => setReceivedDate(value)
                     }
                     value={receivedDate}
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
                     value={documentNumber}
                     onChange={(e) => setDocumentNumber(e.target.value)}
                  />
               </Form.Group>
            </Col>
            <Col></Col>
         </Row>
         <hr></hr>

         <h3>Cliente</h3>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="clientName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
               type="text"
               value={clientName}
               onChange={(e) => setClientName(e.target.value)}
            />
         </Form.Group>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="clientAddress">
            <Form.Label>Morada</Form.Label>
            <Form.Control
               type="text"
               value={address}
               onChange={(e) => setAddress(e.target.value)}
            />
         </Form.Group>
         <Row style={{ paddingBottom: "1%" }}>
            <Col>
               <Label>Nº de Telemóvel</Label>
               <MuiTelInput
                  size="small"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
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
         <hr></hr>

         <h3>Equipamento</h3>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </Form.Group>
         <Row style={{ paddingBottom: "1%" }}>
            <Col>
               <Form.Group controlId="productNumber">
                  <Form.Label>PNC</Form.Label>
                  <Form.Control
                     type="text"
                     value={productNumber}
                     onChange={(e) => setProductNumber(e.target.value)}
                  />
               </Form.Group>
            </Col>
            <Col>
               <Form.Group controlId="serialNumber">
                  <Form.Label>SN</Form.Label>
                  <Form.Control
                     type="text"
                     value={serialNumber}
                     onChange={(e) => setSerialNumber(e.target.value)}
                  />
               </Form.Group>
            </Col>
         </Row>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="breakdown">
            <Form.Label>Avaria</Form.Label>
            <Form.Control
               as="textarea"
               rows={4}
               value={breakdown}
               onChange={(e) => setBreakdown(e.target.value)}
            />
         </Form.Group>
         <Form.Group style={{ paddingBottom: "1%" }} controlId="observations">
            <Form.Label>Observações</Form.Label>
            <Form.Control
               as="textarea"
               rows={2}
               value={observations}
               onChange={(e) => setObservations(e.target.value)}
            />
         </Form.Group>
         <Row>
            <Col md={{ span: 1, offset: 11 }}>
               <Button variant="primary" type="submit" >
                  <div style={{ fontSize: 'bolder' }}>Gravar</div>
               </Button>
            </Col>
         </Row>
      </Form>
   );
}

export default EquipmentForm;
