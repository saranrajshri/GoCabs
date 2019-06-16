import React from "react";

// Importing Context
import UserSearchContext from "./UserSearchContext";

//Bootstrap Components
import { Row, Col, Collapse, Button } from "react-bootstrap";

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
      <div hidden={!this.context.showDirectionsIsOpen}>
        {/* Route Summary */}
        <div className="border border-muted mt-2 p-2">
          <h6 className="text-dark font-weight-bold">Route Summary</h6>
          <p className="text-secondary small">
            Distance :{" "}
            <span className="font-weight-bold">
              {(this.context.routeSummary.distance / 1000).toFixed(1)} {"km"}{" "}
            </span>
            <br />
            Travel Time :
            <span className="font-weight-bold">
              {(this.context.routeSummary.travelTime / 60).toFixed(0)} {"mins"}{" "}
              {"(In Current Traffic Conditions)"}
            </span>
          </p>
          <Button variant="warning text-dark" size="sm">
            Search Drivers
          </Button>
        </div>

        {/* Directions */}
        <div className="border border-muted mt-2 p-2">
          {/* Header */}
          <div
            onClick={this.toggleInstructions}
            aria-controls="instructions"
            aria-expanded={this.state.isInstructionsOpen}
          >
            <Row className="cursor-pointer pt-1 ">
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
            <div id="instructions">
              {this.context.routeSummary.instructions !== undefined
                ? this.context.routeSummary.instructions.map(
                    (instruction, index) => {
                      var res = instruction.instruction.replace(
                        /(<([^>]+)>)/gi,
                        " "
                      );
                      return (
                        <div className="mt-2" key={index}>
                          <p className="text-dark small">
                            {index + 1}. {res}
                          </p>
                        </div>
                      );
                    }
                  )
                : null}
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}
UserSearchInstructions.contextType = UserSearchContext;
export default UserSearchInstructions;
