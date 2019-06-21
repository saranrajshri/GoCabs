import React from "react";

// Context
import UserOrderContext from "./UserOrderContext";

// Components
import DriverNavBarHeader from "../Global/DriverNavBarHeader";
import UserOrderSideBar from "./UserOrderSideBar";
import UserOrderRightSide from "./UserOrderRightSide";

// axios
import axios from "axios";

// Bootstrap Componenets
import { Row, Col } from "react-bootstrap";

class UserOrderIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: [],
      orderDetails: []
    };
  }
  componentDidMount() {
    axios.post("http://localhost:8000/api/user/whoami", {}).then(response => {
      this.setState({
        userData: response.data
      });
      this.interval = setInterval(() => {
        this.getOrderDetails();
      }, 1000);
    });
  }
  getOrderDetails = () => {
    axios
      .post("http://localhost:8000/api/order/getOrders", {
        userid: this.state.userData.id
      })
      .then(response => {
        this.setState({
          orderDetails: response.data[0]
        });
      });
  };
  render() {
    console.log(this.state.orderDetails);
    return (
      <UserOrderContext.Provider value={{ ...this.state }}>
        <DriverNavBarHeader />
        <Row>
          <Col md={4}>
            <UserOrderSideBar />
          </Col>
          <Col md={8}>
            <UserOrderRightSide />
          </Col>
        </Row>
      </UserOrderContext.Provider>
    );
  }
}
UserOrderIndex.contextType = UserOrderContext;
export default UserOrderIndex;
