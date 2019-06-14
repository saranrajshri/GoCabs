import React from "react";

//Bootstrap Components
import { Row, Col, Container } from "react-bootstrap";

//Components
import NavBarHeader from "../Global/NavBarHeader";
import UserSearchResults from "./UserSearchResults";
import UserSearchMap from "./UserSearchMap";

class UserSearchIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      destinationData: ""
    };
  }

  //Recieving data from navbar and setting it to a state
  updateDestinationData = data => {
    this.setState({
      destinationData: data
    });
  };

  render() {
    return (
      <div>
        <NavBarHeader updateDestinationData={this.updateDestinationData} />
        <Container fluid={true}>
          <Row>
            <Col md={4} className="p-3">
              <UserSearchResults destinationData={this.state.destinationData} />
            </Col>
            <Col md={8}>
              <UserSearchMap />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default UserSearchIndex;
