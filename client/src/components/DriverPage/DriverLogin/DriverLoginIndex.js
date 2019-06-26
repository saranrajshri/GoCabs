import React from "react";

// Components
import DriverNavBarHeader from "../../Global/DriverNavBarHeader";
import DriverLoginForm from "./DriverLoginForm";

// importing context
import DriverLoginContext from "./DriverLoginContext";

// Bootstrap Components
import { Row, Container, Col } from "react-bootstrap";

class DriverLoginIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      driverData: []
    };
  }
  updateDriverData = data => {
    this.setState({
      driverData: data
    });
  };
  render() {
    // console.log(this.state.driverData);
    return (
      <DriverLoginContext.Provider
        value={{ ...this.state, updateDriverData: this.updateDriverData }}
      >
        <div
          style={{
            backgroundImage: "url(../images/bg.jpg)",
            backgroundSize: "cover"
          }}
        >
          <DriverNavBarHeader />
          <Container fluid={true} style={{ height: "565px" }}>
            <Row className="mt-5">
              <Col md={3} />
              <Col md={6}>
                <DriverLoginForm />
              </Col>
              <Col md={3} />
            </Row>
          </Container>
        </div>
      </DriverLoginContext.Provider>
    );
  }
}
export default DriverLoginIndex;
