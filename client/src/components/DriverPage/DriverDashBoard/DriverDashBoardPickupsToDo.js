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
      fullOrderData: [],
      userDetails: [],
      showRouteToCustomer: true
    };
  }
  getUserData = () => {
    if (this.state.fullOrderData !== undefined) {
      axios
        .post("http://localhost:8000/api/user/getUserDetails", {
          userid: this.state.fullOrderData.userid
        })
        .then(response => {
          this.setState({
            userDetails: response.data[0]
          });
        });
    }
  };

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
      this.getUserData();
    }, 1000);
  }

  setShowRouteToCustomer = () => {
    this.setState({
      showRouteToCustomer: true
    });
  };

  setShowRouteToDestination = () => {
    this.setState({
      showRouteToCustomer: false
    });
  };
  render() {
    // console.log(this.state.fullOrderData);
    // console.log(this.state.userDetails);
    return (
      <div className="mt-2">
        <Row>
          <Col md={4}>
            <DriverDashBoardPickupsToDoSideBar
              orderData={this.state.fullOrderData}
              setShowRouteToCustomer={this.setShowRouteToCustomer}
              setShowRouteToDestination={this.setShowRouteToDestination}
            />
          </Col>
          <Col md={8}>
            <DriverDashBoardMap
              showRouteToCustomer={this.state.showRouteToCustomer}
              orderData={this.state.fullOrderData}
              userDetails={this.state.userDetails}
              driverDetails={this.context.driverData}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
DriverDashBoardPickupsTodo.contextType = DriverDashBoardContext;
export default DriverDashBoardPickupsTodo;
