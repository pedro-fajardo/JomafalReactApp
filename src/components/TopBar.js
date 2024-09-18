import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../img/jomafal.png";

function TopBar() {
   return (
      <Navbar
         expand="lg"
         className="bg-body-tertiary shadow"
         bg="white"
         data-bs-theme="white"
      >
         <Container style={{ maxWidth: "95%"}}>
            <Navbar.Brand href="#home">
               <img
                  alt=""
                  src={Logo}
                  width="100"
                  height="30"
                  className="d-inline-block align-top logo"
               />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {/*<Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                     <NavDropdown.Item href="#action/3.1">
                        Action
                     </NavDropdown.Item>
                     <NavDropdown.Item href="#action/3.2">
                        Another action
                     </NavDropdown.Item>
                     <NavDropdown.Item href="#action/3.3">
                        Something
                     </NavDropdown.Item>
                     <NavDropdown.Divider />
                     <NavDropdown.Item href="#action/3.4">
                        Separated link
                     </NavDropdown.Item>
   </NavDropdown>
               </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
               <Navbar.Text>
                  Signed in as: <a href="#login">Admin</a>
               </Navbar.Text>
            </Navbar.Collapse>*/}
         </Container>
      </Navbar>
   );
}

export default TopBar;
