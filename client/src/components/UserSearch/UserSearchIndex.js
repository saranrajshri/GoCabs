import React from "react";

//Bootstrap Components
import { Row, Col, Container } from "react-bootstrap";

//Components
import NavBarHeader from "../Global/NavBarHeader";
import UserSearchResults from "./UserSearchResults";
import UserSearchMap from "./UserSearchMap";

class UserSearchIndex extends React.Component {
  render() {
    return (
      <div>
        <NavBarHeader />
        <Container fluid={true}>
          <Row>
            <Col md={4} className="p-3">
              <UserSearchResults />
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
