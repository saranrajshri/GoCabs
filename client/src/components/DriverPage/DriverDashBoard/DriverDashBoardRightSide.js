import React from "react";

// Bootstrap Components
import { Tabs, Tab } from "react-bootstrap";

// Components
import DriverDashBoardPickupsToDo from "./DriverDashBoardPickupsToDo";
import DriverDashBoardGetARide from "./DriverDashBoardGetARide";

class DriverDashBoardRightSide extends React.Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Pickups to do">
            <DriverDashBoardPickupsToDo />
          </Tab>
          <Tab eventKey="profile" title="Get a ride">
            <DriverDashBoardGetARide />
          </Tab>
          <Tab eventKey="contact" title="Others">
            mbcd
          </Tab>
        </Tabs>
      </div>
    );
  }
}
export default DriverDashBoardRightSide;
