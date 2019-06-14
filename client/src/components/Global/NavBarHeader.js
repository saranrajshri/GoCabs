import React from "react";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTaxi, faSearchLocation } from "@fortawesome/free-solid-svg-icons";

//Bootstrap Components
import { Navbar, InputGroup, Form, Button, Col, Nav } from "react-bootstrap";

class NavBarHeader extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faTaxi} className="text-warning mr-2" />
            <span className="">Go</span>
            <span className="text-warning">Cabs</span>
          </Navbar.Brand>

          {/* Search Bar */}
          <Col md={5}>
            <InputGroup>
              <Form.Control type="search" placeholder="Location" />
              <InputGroup.Append>
                <Button variant="warning">
                  <FontAwesomeIcon
                    icon={faSearchLocation}
                    className="text-dark"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>

          <Nav className="mr-auto ml-5">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Register</Nav.Link>
            <Nav.Link href="#pricing">Login</Nav.Link>
          </Nav>
          <Button variant="warning" className="text-dark pl-4 pr-4 rounded">
            Book A Cab
          </Button>
        </Navbar>
      </div>
    );
  }
}
export default NavBarHeader;
