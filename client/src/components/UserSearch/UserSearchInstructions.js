import React from "react";

// Importing Context
import UserSearchContext from "./UserSearchContext";

//Bootstrap Components
import { Row, Col, Collapse } from "react-bootstrap";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

class UserSearchInstructions extends React.Component {
  constructor() {
    super();
    this.state = {
      isInstructionsOpen: false
    };
  }

  // Toggle instructions
  toggleInstructions = () => {
    this.setState({
      isInstructionsOpen: !this.state.isInstructionsOpen
    });
  };

  render() {
    return (
      <div className="border border-muted mt-2 p-2">
        {/* Header */}
        <div
          onClick={this.toggleInstructions}
          aria-controls="instructions"
          aria-expanded={this.state.isInstructionsOpen}
        >
          <Row className="cursor-pointer pt-3 ">
            <Col>
              <h6 className="text-dark font-weight-bold">Directions</h6>
            </Col>
            <Col>
              {this.state.isInstructionsOpen ? (
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className="float-right mr-3"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="float-right mr-3"
                />
              )}
            </Col>
          </Row>
        </div>
        {/* Header End */}
        {/* Body */}
        <Collapse in={this.state.isInstructionsOpen}>
          <div id="instructions" />
        </Collapse>
      </div>
    );
  }
}
UserSearchInstructions.contextType = UserSearchContext;
export default UserSearchInstructions;
