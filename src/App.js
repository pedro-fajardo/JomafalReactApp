import TopBar from "./components/TopBar";
import Card from "./components/Card";
import EquipmentModal from "./components/EquipmentModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
   return (
      <div>
         <TopBar />
         <Container>
            <Row>
               <Col md={{ span: 2, offset: 11 }}>
                  <EquipmentModal></EquipmentModal>
               </Col>
            </Row>
         </Container>
         <div className="card-list">
            <h2>Lista de Equipamentos:</h2>
            <Card />
         </div>
      </div>
   );
}

export default App;
