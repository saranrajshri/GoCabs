import React from "react";

// axios
import axios from "axios";

// importing context
import DriverDashBoardContext from "./DriverDashBoardContext";

//Components
import DriverNavBarHeader from "../../Global/DriverNavBarHeader";
import DriverDashBoardSideBar from "./DriverDashBoardSideBar";

// Bootstrap Components
import { Row, Col } from "react-bootstrap";

class DriverDashBoardIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      driverData: []
    };
  }
  componentDidMount() {
    axios.post("http://localhost:8000/api/driver/whoami", {}).then(res => {
      if (res.data) {
        this.setState({ driverData: res.data });
      }
    });
  }

  render() {
    // console.log(this.state.driverData);
    return (
      <div className="bg-grey">
        <DriverNavBarHeader />
        <Row>
          <Col md={4}>
            <DriverDashBoardSideBar />
          </Col>
          <Col md={8}>right</Col>
        </Row>
      </div>
    );
  }
}
DriverDashBoardIndex.contextType = DriverDashBoardContext;
export default DriverDashBoardIndex;
