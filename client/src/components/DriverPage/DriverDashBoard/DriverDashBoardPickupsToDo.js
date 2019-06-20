import React from "react";

import DriverDashBoardContext from "./DriverDashBoardContext";

// Bootstrap components
import { Row, Col } from "react-bootstrap";

// Components
import DriverDashBoardMap from "./DriverDashBoardMap";
import DriverDashBoardPickupsToDoSideBar from "./DriverDashBoardPickUpsToDoSideBar";

// import axios
import axios from "axios";

class DriverDashBoardPickupsTodo extends React.Component {
  constructor() {
    super();
    this.state = {
      fullOrderData: []
    };
  }
  listenForOrders = () => {
    axios
      .post("http://localhost:8000/api/order/checkForOrders", {
        driverid: this.context.driverData.id
      })
      .then(response => {
        this.setState({
          fullOrderData: response.data[0]
        });
      });
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.listenForOrders();
    }, 1000);
  }
  render() {
    return (
      <div className="mt-2">
        <Row>
          <Col md={4}>
            <DriverDashBoardPickupsToDoSideBar
              orderData={this.state.fullOrderData}
            />
          </Col>
          <Col md={8}>
            <DriverDashBoardMap orderData={this.state.fullOrderData} />
          </Col>
        </Row>
      </div>
    );
  }
}
DriverDashBoardPickupsTodo.contextType = DriverDashBoardContext;
export default DriverDashBoardPickupsTodo;
