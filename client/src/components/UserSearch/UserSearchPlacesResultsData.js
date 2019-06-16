import React from "react";

// Importing context
import UserSearchContext from "./UserSearchContext";

// Bootstrap Components
import { Row, Col, Button, Collapse } from "react-bootstrap";

//FontAwesome Images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTaxi,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";

class UserSearchPlacesResultsData extends React.Component {
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

  //update Destination
  updateDestination = data => {
    var res = {
      title: data.title,
      destinationLat: data.position[0],
      destinationLon: data.position[1],
      destinationIcon:
        "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon"
    };
    this.context.updateDestinationData(res);
  };
  render() {
    var address = this.props.data.vicinity.replace(/(<([^>]+)>)/gi, ",");
    return (
      <div>
        <div>
          <Row
            onClick={this.toggleCollapse}
            aria-controls={null}
            aria-expanded={this.state.collapse}
            className="cursor-pointer"
          >
            <Col md={11}>
              <h6 className="text-dark font-weight-bold">
                {this.props.data.title}
              </h6>{" "}
            </Col>
            <Col md={1}>
              {this.state.collapse ? (
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className="float-right mr-2"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="float-right mr-2"
                />
              )}
            </Col>
          </Row>
          <p className="text-secondary small">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
            {address}
          </p>
          {/* Collapse Content */}
          <Collapse in={this.state.collapse}>
            <div id={this.props.data.id}>
              <p className="small text-secondary">
                {" "}
                {"Category:"}
                <span className="font-weight-bold">
                  {this.props.data.category.title}
                </span>
              </p>
              <Button
                variant="success"
                size="sm"
                title="Click to mark this as destination"
                onClick={() => {
                  this.updateDestination(this.props.data);
                }}
              >
                <FontAwesomeIcon icon={faTaxi} />
              </Button>
            </div>
          </Collapse>
        </div>
        <hr />
      </div>
    );
  }
}
UserSearchPlacesResultsData.contextType = UserSearchContext;
export default UserSearchPlacesResultsData;
