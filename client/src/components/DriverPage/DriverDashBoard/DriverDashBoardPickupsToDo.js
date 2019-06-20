import React from "react";

// Bootstrap components
import { Row, Col } from "react-bootstrap";

// Components
import DriverDashBoardMap from "./DriverDashBoardMap";
import DriverDashBoardPickupsToDoSideBar from "./DriverDashBoardPickUpsToDoSideBar";

class DriverDashBoardPickupsTodo extends React.Component {
  render() {
    return (
      <div className="mt-2">
        <Row>
          <Col md={4}>
            <DriverDashBoardPickupsToDoSideBar />
          </Col>
          <Col md={8}>
            <DriverDashBoardMap />
          </Col>
        </Row>
      </div>
    );
  }
}
export default DriverDashBoardPickupsTodo;
