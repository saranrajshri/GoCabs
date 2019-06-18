import React from "react";

// axios
import axios from "axios";

// importing context
import DriverDashBoardContext from "./DriverDashBoardContext";

//Components
import DriverNavBarHeader from "../../Global/DriverNavBarHeader";
import DriverDashBoardSideBar from "./DriverDashBoardSideBar";
import DriverDashBoardRightSide from "./DriverDashBoardRightSide";

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
      <DriverDashBoardContext.Provider value={this.state}>
        <div>
          <DriverNavBarHeader />
          <Row className="p-3">
            <Col md={3}>
              <DriverDashBoardSideBar />
            </Col>
            <Col md={9}>
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
