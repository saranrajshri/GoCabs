import React from "react";

//Axios
import axios from "axios";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTaxi, faSearchLocation } from "@fortawesome/free-solid-svg-icons";

//Bootstrap Components
import {
  Navbar,
  InputGroup,
  Form,
  Button,
  Col,
  Nav,
  ListGroup,
  Image,
  Row
} from "react-bootstrap";

var destinationData;
class NavBarHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestionsIsOpen: false,
      suggestions: [],
      queryString: "",
      searchBoxValue: ""
    };

    // refs
    this.searchBar = React.createRef();
  }

  search = async val => {
    this.setState({ suggestionsIsOpen: true });
    const res = await axios.get(
      "https://places.demo.api.here.com/places/v1/discover/search?at=20.5937%2C78.9629&q=" +
        this.state.queryString +
        "&app_id=vjy6uZJ1g8cBFrsFC8qX&app_code=JDE3TVLeWDjefVi30qzdaw"
    );
    if (res.data) {
      const result = await res.data["results"]["items"];
      this.setState({ suggestions: result });
    }
    // console.log(this.state.suggestions);
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ queryString: e.target.value });
  };

  // when the list item is clicked
  updateDestination = index => {
    var destination = this.state.suggestions[index];
    // console.log(destination);

    // set the value fromm the item to the search bar
    this.searchBar.current.value = destination.title;

    // update the destinationArray state for showing route
    destinationData = {
      title: destination.title,
      destinationLat: destination.position[0],
      destinationLon: destination.position[1],
      destinationIcon: destination.icon
    };
    this.setState({
      suggestionsIsOpen: false
    });

    // get places suggestions
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

    //send data from child to parent(UserSearchIndex.js)
    this.props.updateDestinationData(destinationData);
    // console.log(this.state.suggestionsIsOpen);
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faTaxi} className="text-warning mr-2" />
            <span className="">Go</span>
            <span className="text-warning">Cabs</span>
          </Navbar.Brand>

          <Col md={5}>
            {/* Search Bar */}
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Location"
                autoComplete="off"
                onChange={e => {
                  this.onChangeHandler(e);
                }}
                ref={this.searchBar}
              />
              <InputGroup.Append>
                <Button variant="warning">
                  <FontAwesomeIcon
                    icon={faSearchLocation}
                    className="text-dark"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {this.state.suggestionsIsOpen}
            {this.state.suggestions &&
            this.state.suggestionsIsOpen &&
            this.searchBar.current.value.length > 1 ? (
              <div className="positon-relative">
                <div className="position-absolute zIndex-plusOne mt-1 w-94">
                  <ListGroup>
                    {this.state.suggestions
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
                              this.updateDestination(index);
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
          </Col>

          <Nav className="mr-auto ml-5">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Register</Nav.Link>
            <Nav.Link href="#pricing">Login</Nav.Link>
          </Nav>
          <Button variant="warning" className="text-dark pl-4 pr-4 rounded">
            Book A Cab
          </Button>
        </Navbar>
      </div>
    );
  }
}
export default NavBarHeader;
