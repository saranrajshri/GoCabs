import React from "react";

// Bootstrap Components
import { Navbar } from "react-bootstrap";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTaxi } from "@fortawesome/free-solid-svg-icons";

class DriverNavBarHeader extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="dark">
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faTaxi} className="text-warning mr-2" />
            <span className="text-white">Go</span>
            <span className="text-warning">Cabs</span>
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}
export default DriverNavBarHeader;
