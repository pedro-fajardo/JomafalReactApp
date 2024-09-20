import React, { useState, useEffect } from "react";
import "dayjs/locale/en-gb";
import { Form, Button, Col, Row } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Label } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { PDFDocument } from 'pdf-lib'
import pdf from '../pdf/Ficha de Atendimento_v5.pdf'
import PrintIcon from '@mui/icons-material/Print';

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

   const [address, setAddress] = useState("");
   const [phoneNumber, setPhoneNumber] = useState(0);
   const [clientName, setClientName] = useState("");
   const [clientId, setClientId] = useState("");
   const [postalCode, setPostalCode] = useState("");

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
      setReceivedDate(data.receivedDate);
      setAddress(data.client.address);
      setPhoneNumber(data.client.phoneNumber);
      setClientName(data.client.name);
      setClientId(data.client.id);
      setPostalCode(data.client.postalCode);
   };

   const updateEquipmentAndClient = async (e) => {
      e.preventDefault();
      const responseEquipment = await axios.put(
         "/api/equipment/" + equipmentId + "/",
         {
            name: name,
            serialNumber: serialNumber,
            productNumber: productNumber,
            breakdown: breakdown,
            observations: observations,
            documentNumber: documentNumber,
            receivedDate: receivedDate,
            client: clientId,
            status: status,
            warranty: warranty
         }
      );

      const responseClient = await axios
         .put("/api/client/" + clientId + "/", {
            name: clientName,
            phoneNumber: phoneNumber,
            address: address,
            postalCode: postalCode
         })
         .then(() => {
            setIsToRefreshData(true);
            closeModal();
         });
   };

   useEffect(() => {
      getEquipment();
   }, []);

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
      const formPdfBytes = await fetch(pdf).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(formPdfBytes)
      const form = pdfDoc.getForm()

      const receivedDateConverted = new Date(receivedDate);

      form.getTextField("clientName").setText(clientName);
      form.getTextField("clientAdress").setText(address);
      form.getTextField("clientPostalCode").setText(postalCode);
      form.getTextField("clientPhone").setText(""+phoneNumber);
      form.getTextField("equipmentPNC").setText(""+productNumber);
      form.getTextField("equipmentName").setText(name);
      form.getTextField("equipmentSerialNumber").setText(""+serialNumber);
      form.getTextField("equipmentBreakdown").setText(breakdown);
      form.getTextField("equipmentObservations").setText(observations);
      form.getTextField("documentNumber").setText(""+documentNumber);
      form.getTextField("year").setText("" + receivedDateConverted.getFullYear());
      form.getTextField("month").setText("" + receivedDateConverted.getMonth());
      form.getTextField("day").setText("" + receivedDateConverted.getDate());
      form.getTextField("hour").setText("" + receivedDateConverted.getHours());
      form.getTextField("minute").setText("" + receivedDateConverted.getMinutes());

      if (warranty) {
         form.getCheckBox("equipmentGarantyYes").check();
      }
      else {
         form.getCheckBox("equipmentGarantyNo").check();
      }

      form.flatten();

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes]);
      const fileUrl = window.URL.createObjectURL(blob);

      let alink = document.createElement("a");
      alink.href = fileUrl;
      alink.download = "Ficha de Atendimento_v5.pdf";
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
            <Modal.Title>Editar Equipamento/Cliente</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            
            <Form onSubmit={updateEquipmentAndClient}>
               <Row>
                  <Col><h3>Equipamento</h3></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col><Button variant="danger" onClick={printPDF}> <PrintIcon></PrintIcon><b> PDF</b> </Button></Col>
               </Row>
               <Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                  <Col>
                     <Form.Group controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                           type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group controlId="name">
                        <Form.Label>Estado do equipamento</Form.Label>
                        <Form.Select
                           value={status}
                           aria-label="Selecionar estado"
                           onChange={(e) => setStatus(e.target.value)}
                        >
                           <option value="new">Novo</option>
                           <option value="repairing">Em Reparação</option>
                           <option value="waiting parts">À Espera de Peças</option>
                           <option value="repaired">Reparado</option>
                           <option value="scrap">Sucata</option>
                        </Form.Select>
                     </Form.Group>
                  </Col>
               </Row>

               <Row style={{ paddingBottom: "2%" }}>
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
               <Form.Group style={{ paddingBottom: "1%" }} controlId="garanty">
                  <Form.Label>Garantia</Form.Label>
                  <Form.Check
                     inline
                     label="Sim"
                     name="group1"
                     type="radio"
                     id={`inline-radio-1`}
                     checked={warranty}
                     onChange={() => { setWarranty(true) }}
                     style={{marginLeft: "2%"}}
                  />
                  <Form.Check
                     inline
                     label="Não"
                     name="group1"
                     type="radio"
                     id={`inline-radio-2`}
                     checked={!warranty}
                     onChange={() => { setWarranty(false) }}
                  />
               </Form.Group>
               <Form.Group
                  style={{ paddingBottom: "1%" }}
                  controlId="breakdown"
               >
                  <Form.Label>Avaria</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={4}
                     value={breakdown}
                     onChange={(e) => setBreakdown(e.target.value)}
                  />
               </Form.Group>
               <Form.Group controlId="observations">
                  <Form.Label>Observações</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={2}
                     value={observations}
                     onChange={(e) => setObservations(e.target.value)}
                  />
               </Form.Group>

               <hr></hr>

               <h3>Cliente</h3>
               <Form.Group
                  style={{ paddingTop: "1%", paddingBottom: "1%" }}
                  controlId="clientName"
               >
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                     type="text"
                     value={clientName}
                     onChange={(e) => setClientName(e.target.value)}
                  />
               </Form.Group>
               <Form.Group
                  style={{ paddingBottom: "1%" }}
                  controlId="clientAddress"
               >
                  <Form.Label>Morada</Form.Label>
                  <Form.Control
                     type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  />
               </Form.Group>
               <Row>
                  <Col>
                     <Label>Nº de Telemóvel</Label>
                     <Form.Control
                        type="number"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneNumber(e.target.value)}
                     />
                  </Col>
                  <Col></Col>
                  <Col>
                     <Form.Group style={{ paddingBottom: "1%" }} controlId="clientPostalCode">
                        <Form.Label>Código de Postal</Form.Label>
                        <Form.Control
                           type="text"
                           value={postalCode}
                           onChange={(e) => setPostalCode(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
                  <Col></Col>
               </Row>

               <hr></hr>

               <Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                  <Col>
                     <Label>Data e Hora de atendimento</Label>
                     <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={"en-gb"}
                     >
                        <DateTimePicker
                           onChange={(value) => setReceivedDate(value)}
                           value={dayjs(receivedDate)}
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

               <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button type="submit">Guardar Alterações</Button>
               </Box>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default EquipmentEditModal;
