import React from "react";

// impoorting axios
import axios from "axios";

// Importing Context
import UserSearchContext from "./UserSearchContext";

//Bootstrap Components
import { Row, Col, Collapse, Button } from "react-bootstrap";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

// Components
import UserSearchLoginModal from "./UserSearchLoginModal";
import UserSearchDriversModal from "./UserSearchDriversModal";
import DifferentWaysOfTransportModal from "./DifferentWaysOfTransportModal";

class UserSearchInstructions extends React.Component {
  constructor() {
    super();
    this.state = {
      isInstructionsOpen: false,
      loginAndRegiterModalIsOpen: false,
      showDriversModalIsOpen: false,
      DifferentWaysOfTransportModalIsOpen: false,
      userLat: "",
      userLon: ""
    };
  }

  // transport modal
  showModal = () => {
    this.setState({
      DifferentWaysOfTransportModalIsOpen: true
    });
  };
  // Toggle instructions
  toggleInstructions = () => {
    this.setState({
      isInstructionsOpen: !this.state.isInstructionsOpen
    });
  };

  // Search For Drivers
  searchForDrivers = () => {
    if (this.context.userData.id === undefined) {
      // Open Modal
      this.updateDetailsToDB();
      this.handleShow();
    } else {
      this.setState({ showDriversModalIsOpen: true });
    }
  };

  // Modal
  handleClose = () => {
    this.setState({ loginAndRegiterModalIsOpen: false });
  };

  handleShow = () => {
    this.setState({ loginAndRegiterModalIsOpen: true });
  };

  // Show Drivers Modal
  showDriversModal = () => {
    this.setState({
      showDriversModalIsOpen: true
    });
  };

  // get coordinates of the user
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  showPosition = position => {
    this.setState({
      userLat: position.coords.latitude,
      userLon: position.coords.longitude
    });
  };

  // update all details to db
  updateDetailsToDB = () => {
    axios.put("http://localhost:8000/api/user/updateUserSchema", {
      id: this.context.userData.id,
      originLat: this.context.originData.originLat,
      originLon: this.context.originData.originLon,
      originTitle: this.context.originData.title,
      destinationLat: this.context.destinationData.destinationLat,
      destinationLon: this.context.destinationData.destinationLon,
      destinationTitle: this.context.destinationData.title,
      userLat: this.state.userLat,
      userLon: this.state.userLon
    });
  };
  componentDidMount() {
    this.getLocation();
  }
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
          <Button
            variant="warning text-dark"
            size="sm"
            onClick={this.showModal}
          >
            Book
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
        <UserSearchLoginModal
          isOpen={this.state.loginAndRegiterModalIsOpen}
          handleClose={this.handleClose}
          showDrivers={this.showDriversModal}
        />
        <UserSearchDriversModal
          isOpen={this.state.showDriversModalIsOpen}
          handleClose={() => {
            this.setState({ showDriversModalIsOpen: false });
          }}
        />
        <DifferentWaysOfTransportModal
          isOpen={this.state.DifferentWaysOfTransportModalIsOpen}
          showDriversModal={this.showDriversModal}
          handleClose={() => {
            this.setState({ DifferentWaysOfTransportModalIsOpen: false });
          }}
        />
      </div>
    );
  }
}
UserSearchInstructions.contextType = UserSearchContext;
export default UserSearchInstructions;
