import React from "react";

// axios
import axios from "axios";

// importing context
import DriverDashBoardContext from "./DriverDashBoardContext";

//Components
import DriverNavBarHeader from "../../Global/DriverNavBarHeader";
// import DriverDashBoardSideBar from "./DriverDashBoardSideBar";
import DriverDashBoardRightSide from "./DriverDashBoardRightSide";

// Bootstrap Components
import { Row, Col } from "react-bootstrap";

class DriverDashBoardIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      driverData: [],
      orderData: []
    };
  }

  updateOrderData = data => {
    this.setState({
      orderData: data
    });
  };

  componentDidMount() {
    axios.post("http://localhost:8000/api/driver/whoami", {}).then(res => {
      if (res.data) {
        this.setState({ driverData: res.data });
      }
    });
  }

  render() {
    
    // console.log(this.state.driverData);
    console.log(this.state.orderData);
    return (
      <DriverDashBoardContext.Provider
        value={{
          ...this.state,
          updateOrderData: this.updateOrderData
        }}
      >
        <div>
          <DriverNavBarHeader />
          <Row className="p-3">
            {/* <Col md={3}><DriverDashBoardSideBar /></Col> */}
            <Col md={12}>
              <DriverDashBoardRightSide />
            </Col>
          </Row>
        </div>
      </DriverDashBoardContext.Provider>
    );
  }
}
DriverDashBoardIndex.contextType = DriverDashBoardContext;
export default DriverDashBoardIndex;
