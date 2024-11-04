import React, { useState, useEffect } from "react";
import "dayjs/locale/en-gb";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Label } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import axios from "axios";


function ClientDetail({
   setIsToRefreshData,
   isModalVisible,
   setIsModalVisible,
   clientId,
}) {
   const [address, setAddress] = useState("");
   const [phoneNumber, setPhoneNumber] = useState(0);
   const [clientName, setClientName] = useState("");
   const [postalCode, setPostalCode] = useState("");
   const [nif, setNif] = useState("");
   const [clientNumber, setClientNumber] = useState("");

   const getClient = async () => {
      const { data } = await axios.get("/api/client/" + clientId + "/");

      setAddress(data.address);
      setPhoneNumber(data.phoneNumber);
      setClientName(data.name);
      setNif(data.nif);
      setClientNumber(data.clientNumber);
      setPostalCode(data.postalCode);
   };

   const updateClient = async (e) => {
      e.preventDefault();
      await axios
         .put("/api/client/" + clientId + "/", {
            name: clientName,
            phoneNumber: phoneNumber,
            address: address,
            postalCode: postalCode,
            nif: nif,
            clientNumber: clientNumber,
         })
         .then((response) => {
            closeModal();
            setIsToRefreshData(true);
         });
   };

   useEffect(() => {
      getClient();
   }, []);

   const closeModal = () => {
      setIsModalVisible(false);
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

   return (
      <Modal
         size="xl"
         show={isModalVisible}
         onHide={() => setIsModalVisible(false)}
         backdrop="static"
         aria-labelledby="example-modal-sizes-title-lg"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title>Editar Cliente - {clientName}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={updateClient}>
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

               <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button type="submit">Guardar Alterações</Button>
               </Box>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default ClientDetail;
