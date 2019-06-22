import React from "react";

//axios
import axios from "axios";

//Importing Context
import UserSearchContext from "./UserSearchContext";

//Bootstrap Components
import { Form, ListGroup, Row, Col, Image } from "react-bootstrap";

//Components
import UserSearchInstructions from "./UserSearchInstructions";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

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
      instructionsIsOpen: false,
      chooseYourLocationFrom: false,
      chooseYourLocationTo: false
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
        "&app_id=xPIcFc8xn5PLiheKwn5p&app_code=8f8NlzUfaHYVJuitDFoDgA"
    );
    const suggestions = await res.data["results"]["items"];
    this.setState({ fromSuggestions: suggestions });
    // console.log(this.state.fromSuggestions);
  };

  onFromChangeHandler = async e => {
    this.fromSearch(e.target.value);
    this.setState({
      fromQueryString: e.target.value
    });
  };
  // From suggestions end

  toSearch = async val => {
    this.setState({ suggestionsToIsOpen: true });
    const res = await axios.get(
      "https://places.demo.api.here.com/places/v1/discover/search?at=20.5937%2C78.9629&q=" +
        this.state.toQueryString +
        "&app_id=xPIcFc8xn5PLiheKwn5p&app_code=8f8NlzUfaHYVJuitDFoDgA"
    );
    const suggestions = await res.data["results"]["items"];
    this.setState({ toSuggestions: suggestions });
    // console.log(this.state.toSuggestions);
  };

  onToChangeHandler = async e => {
    this.toSearch(e.target.value);
    this.setState({
      toQueryString: e.target.value
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
      suggestionsToIsOpen: false,
      placesSuggestions: true
    });

    //send data from child to parent(UserSearchIndex.js)
    this.props.updateDestinationData(destinationData);
    // console.log(this.state.suggestionsIsOpen);

    // get places suggestions
    axios
      .get(
        "https://places.demo.api.here.com/places/v1/discover/here?at=" +
          destinationData.destinationLat +
          "%2C" +
          destinationData.destinationLon +
          "&app_id=xPIcFc8xn5PLiheKwn5p&app_code=8f8NlzUfaHYVJuitDFoDgA"
      )
      .then(res => {
        // send data to index
        var data = res.data.results.items;
        this.props.updatePlacesSuggestions(data);
      });
  };

  // toggle Choose your Location
  toggleChooseYourLocationFrom = () => {
    this.setState({
      chooseYourLocationFrom: !this.state.chooseYourLocationFrom
    });
  };

  //update User Location in from search Bar
  updateUserLocationOnFromSearchBar = () => {
    this.setState({
      chooseYourLocationFrom: false
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.storePositionFromSearchBar);
    } else {
      alert("Geolocation is not supported by this browser");
    }
    this.fromSearchBar.current.value = "Your Location";
  };
  storePositionFromSearchBar = position => {
    var originData = {
      title: "Your Location",
      originLat: position.coords.latitude,
      originLon: position.coords.longitude,
      originIcon:
        "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon"
    };
    //send data from child to parent(UserSearchIndex.js)
    this.props.updateOriginData(originData);
  };

  // To searchBar update User  Location
  // toggle Choose your Location
  toggleChooseYourLocationTo = () => {
    this.setState({
      chooseYourLocationTo: !this.state.chooseYourLocationTo
    });
  };

  //update User Location in from search Bar
  updateUserLocationOnToSearchBar = () => {
    this.setState({
      chooseYourLocationTo: false
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.storePositionToSearchBar);
    } else {
      alert("Geolocation is not supported by this browser");
    }
    this.toSearchBar.current.value = "Your Location";
  };
  storePositionToSearchBar = position => {
    var destinationData = {
      title: "Your Location",
      destinationLat: position.coords.latitude,
      destinationLon: position.coords.longitude,
      destinationIcon:
        "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon"
    };
    //send data from child to parent(UserSearchIndex.js)
    this.props.updateDestinationData(destinationData);
    // get suggestions places
    axios
      .get(
        "https://places.demo.api.here.com/places/v1/discover/here?at=" +
          destinationData.destinationLat +
          "%2C" +
          destinationData.destinationLon +
          "&app_id=vjy6uZJ1g8cBFrsFC8qX&app_code=JDE3TVLeWDjefVi30qzdaw"
      )
      .then(res => {
        // send data to index
        var data = res.data.results.items;
        this.props.updatePlacesSuggestions(data);
      });
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
                onClick={this.toggleChooseYourLocationFrom}
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
              {/* Choose Your Location dropdown */}
              {this.state.chooseYourLocationFrom &&
              this.fromSearchBar.current.value === "" ? (
                <div className="positon-relative">
                  <div className="position-absolute zIndex-plusOne mt-1 w-85">
                    <ListGroup>
                      <ListGroup.Item
                        className="cursor-pointer suggestion-item"
                        onClick={this.updateUserLocationOnFromSearchBar}
                      >
                        <FontAwesomeIcon icon={faMapPin} className="mr-2" />
                        Use My Location
                      </ListGroup.Item>
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
                onClick={this.toggleChooseYourLocationTo}
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
              {/* Choose Your Location dropdown */}
              {this.state.chooseYourLocationTo &&
              this.toSearchBar.current.value === "" ? (
                <div className="positon-relative">
                  <div className="position-absolute zIndex-plusOne mt-1 w-85">
                    <ListGroup>
                      <ListGroup.Item
                        className="cursor-pointer suggestion-item"
                        onClick={this.updateUserLocationOnToSearchBar}
                      >
                        <FontAwesomeIcon icon={faMapPin} className="mr-2" />
                        Use My Location
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </div>
              ) : null}
            </Form.Group>
          </Form>
        </div>
        <UserSearchInstructions />
      </div>
    );
  }
}
UserSearchBookCabs.contextType = UserSearchContext;
export default UserSearchBookCabs;
