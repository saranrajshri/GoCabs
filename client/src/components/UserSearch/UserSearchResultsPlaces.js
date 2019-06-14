import React from "react";

//FontAwesome Images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTaxi,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

//Bootstrap Components
import { Row, Col, Button, Collapse } from "react-bootstrap";

class UserSearchResultsPlaces extends React.Component {
  constructor() {
    super();
    this.state = {
      collapse: false
    };
  }
  // Toggle function
  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <div className="mt-1">
        <Row
          onClick={this.toggleCollapse}
          aria-controls={this.props.cat.id}
          aria-expanded={this.state.collapse}
        >
          <Col>
            <h6 className="text-dark font-weight-bold">Dubakoor Hotel Thada</h6>
          </Col>
          <Col>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="float-right mr-2 cursor-pointer"
            />
          </Col>
        </Row>

        <p className="text-secondary small">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
          123,Swami Vivekandar Street
        </p>

        {/* Collapse Content */}
        <Collapse in={this.state.collapse}>
          <div id={this.props.cat.id}>
            <p>{this.props.cat.title}</p>
            <Button variant="success" size="sm">
              <FontAwesomeIcon icon={faTaxi} />
            </Button>
          </div>
        </Collapse>

        <hr />
      </div>
    );
  }
}
export default UserSearchResultsPlaces;
