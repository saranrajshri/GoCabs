import React from "react";

//axios
import axios from "axios";

//Importing Context
import UserSearchContext from "./UserSearchContext";

//Bootstrap Components
import { Form, ListGroup, Row, Col, Image } from "react-bootstrap";

//Components
import UserSearchResults from "./UserSearchResults";
import UserSearchInstructions from "./UserSearchInstructions";

class UserSearchBookCabs extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestionsFromIsOpen: false,
      fromQueryString: "",
      fromSuggestions: [],
      suggestionsToIsOpen: false,
      toQueryString: "",
      toSuggestions: [],
      placesSuggestions: false,
      instructionsIsOpen: false
    };
    this.fromSearchBar = React.createRef();
    this.toSearchBar = React.createRef();
  }

  // from suggestions start
  fromSearch = async val => {
    this.setState({ suggestionsFromIsOpen: true });
    const res = await axios.get(
      "https://places.demo.api.here.com/places/v1/discover/search?at=20.5937%2C78.9629&q=" +
        this.state.fromQueryString +
        "&app_id=vjy6uZJ1g8cBFrsFC8qX&app_code=JDE3TVLeWDjefVi30qzdaw"
    );
    const suggestions = await res.data["results"]["items"];
    this.setState({ fromSuggestions: suggestions });
    // console.log(this.state.fromSuggestions);
  };

  onFromChangeHandler = async e => {
    this.fromSearch(e.target.value);
    this.setState({
      fromQueryString: e.target.value,
      placesSuggestions: true
    });
  };
  // From suggestions end

  toSearch = async val => {
    this.setState({ suggestionsToIsOpen: true });
    const res = await axios.get(
      "https://places.demo.api.here.com/places/v1/discover/search?at=20.5937%2C78.9629&q=" +
        this.state.toQueryString +
        "&app_id=vjy6uZJ1g8cBFrsFC8qX&app_code=JDE3TVLeWDjefVi30qzdaw"
    );
    const suggestions = await res.data["results"]["items"];
    this.setState({ toSuggestions: suggestions });
    // console.log(this.state.toSuggestions);
  };

  onToChangeHandler = async e => {
    this.toSearch(e.target.value);
    this.setState({
      toQueryString: e.target.value,
      placesSuggestions: true
    });
  };

  // when the list item is clicked
  updateFromLocation = index => {
    var origin = this.state.fromSuggestions[index];
    // console.log(destination);

    // Setting the value of the fromSearchbar
    this.fromSearchBar.current.value = origin.title;

    // update the destinationArray state for showing route
    var originData = {
      title: origin.title,
      originLat: origin.position[0],
      originLon: origin.position[1],
      originIcon: origin.icon
    };
    this.setState({
      suggestionsFromIsOpen: false
    });

    //send data from child to parent(UserSearchIndex.js)
    this.props.updateOriginData(originData);
    // console.log(this.state.suggestionsIsOpen);
  };

  updateToLocation = index => {
    var destination = this.state.toSuggestions[index];
    // console.log(destination);

    // Setting the value of the fromSearchbar
    this.toSearchBar.current.value = destination.title;

    // update the destinationArray state for showing route
    var destinationData = {
      title: destination.title,
      destinationLat: destination.position[0],
      destinationLon: destination.position[1],
      destinationIcon: destination.icon
    };
    this.setState({
      suggestionsToIsOpen: false
    });

    //send data from child to parent(UserSearchIndex.js)
    this.props.updateDestinationData(destinationData);
    // console.log(this.state.suggestionsIsOpen);
  };

  render() {
    return (
      <div>
        <p className="text-secodary font-weight-bold text-secondary small">
          Book a cab to{" "}
          <span className="text-primary">
            {this.context.destinationData.title}
          </span>
        </p>
        {/* Showing Booking Form */}
        <div className="border border-muted p-2 mb-3">
          <Form>
            <Form.Group controlId="fromLocation">
              <Form.Label className="text-secondary small font-weight-bold">
                FROM
              </Form.Label>
              <Form.Control
                type="search"
                placeholder="Type a place or pick from map"
                autoComplete="off"
                onChange={e => {
                  this.onFromChangeHandler(e);
                }}
                ref={this.fromSearchBar}
              />
              {/* From suggestions Box */}
              {this.state.suggestionsFromIsOpen ? (
                <div className="positon-relative">
                  <div className="position-absolute zIndex-plusOne mt-1 w-85">
                    <ListGroup>
                      {this.state.fromSuggestions
                        .slice(0, 5)
                        .map((suggestionArray, index) => {
                          var streetName = suggestionArray.vicinity.replace(
                            /(<([^>]+)>)/gi,
                            ","
                          );
                          return (
                            <ListGroup.Item
                              key={index}
                              className="suggestion-item"
                              onClick={() => {
                                this.updateFromLocation(index);
                              }}
                            >
                              <Row>
                                <Col md={1}>
                                  <Image
                                    src={suggestionArray.icon}
                                    className="w-30px"
                                  />
                                </Col>
                                <Col md={11}>
                                  {suggestionArray.title}

                                  <p className="text-secondary small font-weight-bold">
                                    {streetName}
                                  </p>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          );
                        })}
                    </ListGroup>
                  </div>
                </div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="ToLocation">
              <Form.Label className="text-secondary small font-weight-bold">
                TO
              </Form.Label>
              <Form.Control
                type="search"
                placeholder="Type a place or pick from map"
                defaultValue={this.context.destinationData.title}
                autoComplete="off"
                onChange={e => {
                  this.onToChangeHandler(e);
                }}
                ref={this.toSearchBar}
              />
              {/* To suggestions Box */}
              {this.state.suggestionsToIsOpen ? (
                <div className="positon-relative">
                  <div className="position-absolute zIndex-plusOne mt-1 w-85">
                    <ListGroup>
                      {this.state.toSuggestions
                        .slice(0, 5)
                        .map((suggestionArray, index) => {
                          var streetName = suggestionArray.vicinity.replace(
                            /(<([^>]+)>)/gi,
                            ","
                          );
                          return (
                            <ListGroup.Item
                              key={index}
                              className="suggestion-item"
                              onClick={() => {
                                this.updateToLocation(index);
                              }}
                            >
                              <Row>
                                <Col md={1}>
                                  <Image
                                    src={suggestionArray.icon}
                                    className="w-30px"
                                  />
                                </Col>
                                <Col md={11}>
                                  {suggestionArray.title}

                                  <p className="text-secondary small font-weight-bold">
                                    {streetName}
                                  </p>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          );
                        })}
                    </ListGroup>
                  </div>
                </div>
              ) : null}
            </Form.Group>
          </Form>
        </div>
        <UserSearchResults isOpen={this.state.placesSuggestions} />
        <UserSearchInstructions />
      </div>
    );
  }
}
UserSearchBookCabs.contextType = UserSearchContext;
export default UserSearchBookCabs;
