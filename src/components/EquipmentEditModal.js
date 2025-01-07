import React, { useState, useEffect } from "react";
import "dayjs/locale/en-gb";
import { Form, Button, Col, Row, Table } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Label } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import pdf from "../pdf/Ficha ASJ.pdf";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";

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
            partsIva: "" + ( Number.isNaN(iva) ? "0" : iva),
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
      } else {
         form.getCheckBox("equipmentWarrantyNo").check();
      }

      form.getTextField("equipmentReceiptNumber").setText("" + receiptNumber);
      form.getTextField("equipmentWarrantyDate").setText("" + warrantyDate);

      if(!parts.empty)
      {
         parts.forEach((part,index) => {
            form.getTextField("codeRow"+(index+1)).setText("" + part.code);
            form.getTextField("quantityRow"+(index+1)).setText("" + part.quantity);
            form.getTextField("descriptionRow"+(index+1)).setText("" + part.description);
            form.getTextField("valueRow"+(index+1)).setText("" + part.value);
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
            <Modal.Title>Editar Equipamento/Cliente</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={updateEquipmentAndClient}>
               <Row>
                  <Col>
                     <h3>Equipamento</h3>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                     <Button variant="danger" onClick={printPDF}>
                        {" "}
                        <PrintIcon></PrintIcon>
                        <b> PDF</b>{" "}
                     </Button>
                  </Col>
               </Row>
               <Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                  <Col>
                     <Form.Group controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                           className="border-2"
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
                           className="border-2"
                           value={status}
                           aria-label="Selecionar estado"
                           onChange={(e) => setStatus(e.target.value)}
                        >
                           <option value="new">Novo</option>
                           <option value="repairing">Em Reparação</option>
                           <option value="waiting parts">
                              À Espera de Peças
                           </option>
                           <option value="repaired">Reparado</option>
                           <option value="recycle">Reciclagem</option>
                        </Form.Select>
                     </Form.Group>
                  </Col>
               </Row>

               <Row style={{ paddingBottom: "2%" }}>
                  <Col>
                     <Form.Group controlId="productNumber">
                        <Form.Label>PNC</Form.Label>
                        <Form.Control
                           className="border-2"
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
                           className="border-2"
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
                     onChange={() => {
                        setWarranty(true);
                     }}
                     style={{ marginLeft: "2%" }}
                  />
                  <Form.Check
                     inline
                     label="Não"
                     name="group1"
                     type="radio"
                     id={`inline-radio-2`}
                     checked={!warranty}
                     onChange={() => {
                        setWarranty(false);
                     }}
                  />
               </Form.Group>
               <Row style={{ paddingBottom: "2%" }}>
                  <Col>
                     <Form.Group controlId="receiptNumber">
                        <Form.Label>Nº Fatura</Form.Label>
                        <Form.Control
                           className="border-2"
                           type="text"
                           value={receiptNumber}
                           disabled={!warranty}
                           onChange={(e) => setReceiptNumber(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group controlId="warrantyDate">
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                           className="border-2"
                           type="date"
                           value={warrantyDate}
                           disabled={!warranty}
                           onChange={(e) => setWarrantyDate(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Form.Group
                  style={{ paddingBottom: "1%" }}
                  controlId="breakdown"
               >
                  <Form.Label>Avaria</Form.Label>
                  <Form.Control
                     className="border-2"
                     as="textarea"
                     rows={4}
                     value={breakdown}
                     onChange={(e) => setBreakdown(e.target.value)}
                  />
               </Form.Group>
               <Form.Group controlId="observations">
                  <Form.Label>Observações</Form.Label>
                  <Form.Control
                     className="border-2"
                     as="textarea"
                     rows={2}
                     value={observations}
                     onChange={(e) => setObservations(e.target.value)}
                  />
               </Form.Group>
               {/* Parts Table */}
               <h4 className="pt-4">Lista de Peças</h4>
               <Table striped bordered hover size="sm">
                  <thead>
                     <tr>
                        <th>Código</th>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Valor (€)</th>
                        <th>Ação</th> {/* Add a header for the action column */}
                     </tr>
                  </thead>
                  <tbody>
                     {parts &&
                        parts.map((part, index) => (
                           <tr key={index}>
                              <td>
                                 <Form.Control
                                    type="text"
                                    value={part.code}
                                    onChange={(e) =>
                                       updatePart(index, "code", e.target.value)
                                    }
                                 />
                              </td>
                              <td>
                                 <Form.Control
                                    type="number"
                                    value={part.quantity}
                                    onChange={(e) =>
                                       updatePart(
                                          index,
                                          "quantity",
                                          e.target.value
                                       )
                                    }
                                 />
                              </td>
                              <td>
                                 <Form.Control
                                    type="text"
                                    value={part.description}
                                    onChange={(e) =>
                                       updatePart(
                                          index,
                                          "description",
                                          e.target.value
                                       )
                                    }
                                 />
                              </td>
                              <td>
                                 <Form.Control
                                    type="number"
                                    value={part.value}
                                    onChange={(e) =>
                                       updatePart(
                                          index,
                                          "value",
                                          parseFloat(e.target.value)
                                       )
                                    }
                                 />
                              </td>
                              <td>
                                 <button
                                    type="button"
                                    onClick={() => deletePart(index)} // Handle delete action
                                    style={{
                                       border: "none",
                                       background: "none",
                                       cursor: "pointer",
                                    }}
                                 >
                                    <DeleteIcon style={{ color: "red" }} />{" "}
                                    {/* Use Material Icon */}
                                 </button>
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </Table>
               <Button variant="primary" onClick={addPart}>
                  Adicionar Peça
               </Button>
               {/* Calculation fields */}
               <Row className="pt-3">
                  <Col>
                     <Form.Group controlId="baseValue">
                        <Form.Label>Valor Base (€)</Form.Label>
                        <Form.Control
                           type="number"
                           value={baseValue.toFixed(2)}
                           readOnly
                        />
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group controlId="iva">
                        <Form.Label>IVA (%)</Form.Label>
                        <Form.Control
                           type="number"
                           value={iva}
                           onChange={(e) => setIva(parseFloat(e.target.value))}
                        />
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group controlId="totalValue">
                        <Form.Label>Valor Total (€)</Form.Label>
                        <Form.Control
                           type="number"
                           value={totalValue.toFixed(2)}
                           readOnly
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <hr></hr>

               <h3>Cliente</h3>
               <Form.Group
                  style={{ paddingTop: "1%", paddingBottom: "1%" }}
                  controlId="clientName"
               >
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                     className="border-2"
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
                     className="border-2"
                     type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  />
               </Form.Group>
               <Row>
                  <Col>
                     <Label>Nº de Telemóvel</Label>
                     <Form.Control
                        className="border-2"
                        type="number"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneNumber(e.target.value)}
                     />
                  </Col>
                  <Col></Col>
                  <Col>
                     <Form.Group
                        style={{ paddingBottom: "1%" }}
                        controlId="clientPostalCode"
                     >
                        <Form.Label>Código de Postal</Form.Label>
                        <Form.Control
                           className="border-2"
                           type="text"
                           value={postalCode}
                           onChange={(e) => setPostalCode(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
                  <Col></Col>
               </Row>
               <Row className="py-2">
                  <Col>
                     <Form.Group
                        style={{ paddingBottom: "1%" }}
                        controlId="clientNif"
                     >
                        <Form.Label>NIF</Form.Label>
                        <Form.Control
                           className="border-2"
                           type="number"
                           value={nif}
                           onChange={(e) => setNif(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
                  <Col></Col>
                  <Col>
                     <Form.Group
                        style={{ paddingBottom: "1%" }}
                        controlId="clientNumber"
                     >
                        <Form.Label>Nº Cliente Jomafal</Form.Label>
                        <Form.Control
                           className="border-2"
                           type="text"
                           value={clientNumber}
                           onChange={(e) => setClientNumber(e.target.value)}
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
                           className="border-2"
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
