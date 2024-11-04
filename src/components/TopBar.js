import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
//import Logo from "../img/jomafal.png";

function TopBar( {selectedTab, setSelectedTab}) {
   return (
      <Navbar
         expand="lg"
         className="bg-body-tertiary shadow"
         bg="white"
         data-bs-theme="white"
      >
         <Container style={{ maxWidth: "95%"}}>
            <Navbar.Brand href="#home">
               <b>ASJ</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Link to="/" onClick={() => { setSelectedTab("equipments")}} className="text-decoration-none text-black px-4">
                     { selectedTab === "equipments" ?
                        <b>Equipamentos</b>
                        :
                        <div>Equipamentos</div>
                     }
                  </Link>
                  <Link to="/clients" onClick={() => { setSelectedTab("clients")}} className="text-decoration-none text-black">
                     { selectedTab === "clients" ?
                        <b>Clientes</b>
                        :
                        <div>Clientes</div>
                     }
                  </Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default TopBar;
