import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CardImage from "../img/card.jpg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function EquipmentCard() {
   return (
      <Row xs={1} md={6} className="g-4">
         <>
            {[
               "Primary",
               "Secondary",
               "Success",
               "Danger",
               "Warning",
               "Info",
               "Light",
               "Dark",
            ].map((variant, index) => (
               <Col key={index}>
                  <Card
                     bg={variant.toLowerCase()}
                     key={variant}
                     text={variant.toLowerCase() === "light" ? "dark" : "white"}
                     style={{ width: "100%" }}
                     className="mb-2"
                  >
                     <Card.Img variant="top" src={CardImage} />
                     <Card.Body>
                        <Card.Title>Equipamento {index + 1}</Card.Title>
                     </Card.Body>
                     <ListGroup className="list-group-flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                     </ListGroup>
                     <Card.Body>
                        <Button>Ver Detalhe</Button>
                     </Card.Body>
                  </Card>
               </Col>
            ))}
         </>
      </Row>
   );
}

export default EquipmentCard;
