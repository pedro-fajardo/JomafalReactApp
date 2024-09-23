import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
               {/*<img
                  alt=""
                  src={Logo}
                  width="100"
                  height="30"
                  className="d-inline-block align-top logo"
               />*/}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link onClick={() => { setSelectedTab("equipments")}}>
                     { selectedTab === "equipments" ?
                        <b>Equipamentos</b>
                        :
                        <div>Equipamentos</div>
                     }
                  </Nav.Link>
                  <Nav.Link onClick={() => { setSelectedTab("clients")}}>
                     { selectedTab === "clients" ?
                        <b>Clientes</b>
                        :
                        <div>Clientes</div>
                     }
                  </Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default TopBar;
