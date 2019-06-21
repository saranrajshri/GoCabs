import React from "react";

// importing context
import DriverDashBoardContext from "./DriverDashBoardContext";

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
          <Tab eventKey="home" title="Get a ride">
            <DriverDashBoardGetARide />
          </Tab>
          <Tab eventKey="profile" title="Pickups to do">
            <DriverDashBoardPickupsToDo />
          </Tab>
          <Tab eventKey="contact" title="Others">
            mbcd
          </Tab>
        </Tabs>
      </div>
    );
  }
}
DriverDashBoardRightSide.contextType = DriverDashBoardContext;
export default DriverDashBoardRightSide;
