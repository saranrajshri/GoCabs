import React from "react";

//Importing Context
import UserSearchContext from "./UserSearchContext";

//Bootstrap Components
import { Row, Col, Container } from "react-bootstrap";

//Components
import NavBarHeader from "../Global/NavBarHeader";
import UserSearchMap from "./UserSearchMap";
import UserSearchBookCabs from "./UserSearchBookCabs";

class UserSearchIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      destinationData: "",
      originData: "",
      routeSummary: []
    };
  }

  //Recieving data from navbar and setting it to a state
  updateDestinationData = data => {
    this.setState({
      destinationData: data
    });
  };

  //recieving data from the left section
  updateOriginData = data => {
    this.setState({
      originData: data
    });
  };

  //Recieving Route summary from UserSearchMaps
  updateRouteSummary = data => {
    this.setState({
      routeSummary: data
    });
  };

  render() {
    // console.log(this.state.routeSummary[0]);
    return (
      <UserSearchContext.Provider value={this.state}>
        <div>
          <NavBarHeader updateDestinationData={this.updateDestinationData} />
          <Container fluid={true}>
            <Row>
              <Col md={4} className="p-3">
                <UserSearchBookCabs
                  updateOriginData={this.updateOriginData}
                  updateDestinationData={this.updateDestinationData}
                />
              </Col>
              <Col md={8}>
                <UserSearchMap updateRouteSummary={this.updateRouteSummary} />
              </Col>
            </Row>
          </Container>
        </div>
      </UserSearchContext.Provider>
    );
  }
}
UserSearchIndex.contextType = UserSearchContext;
export default UserSearchIndex;
