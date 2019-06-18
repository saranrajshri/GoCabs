import React from "react";

// axios
import axios from "axios";

//Importing Context
import UserSearchContext from "./UserSearchContext";

//Bootstrap Components
import { Row, Col, Container } from "react-bootstrap";

//Components
import UserNavBarHeader from "../Global/UserNavBarHeader";
import UserSearchMap from "./UserSearchMap";
import UserSearchBookCabs from "./UserSearchBookCabs";
import UserSearchPlacesResults from "./UserSearchPlacesResults";

class UserSearchIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      destinationData: "",
      originData: "",
      routeSummary: [],
      showDirectionsIsOpen: false,
      placesSuggestions: [],
      userData: {}
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
      routeSummary: data,
      showDirectionsIsOpen: true
    });
  };

  updatePlacesSuggestions = data => {
    this.setState({
      placesSuggestions: data
    });
  };

  updateUserData = data => {
    this.setState({
      userData: data
    });
  };

  deleteDataFromDB = () => {
    axios
      .post("http://localhost:8000/api/user/deleteDataFromDB", {
        id: this.state.userData.id
      })
      .then(response => {
        this.setState({
          userData: response
        });
      });
    console.log("deleted");
  };

  componentDidMount() {
    // send who am i request
    axios.post("http://localhost:8000/api/user/whoami", {}).then(res => {
      if (res.data) {
        this.setState({ userData: res.data });
      }
    });
  }
  render() {
    // console.log(this.state.placesSuggestions);
    // console.log(this.state.userData);
    return (
      <UserSearchContext.Provider
        value={{
          ...this.state,
          updateDestinationData: this.updateDestinationData,
          updateUserData: this.updateUserData,
          deleteDataFromDB: this.deleteDataFromDB
        }}
      >
        <div>
          <UserNavBarHeader
            updateDestinationData={this.updateDestinationData}
            updatePlacesSuggestions={this.updatePlacesSuggestions}
          />
          <Container fluid={true}>
            <Row>
              <Col md={4} className="p-3">
                <UserSearchBookCabs
                  updateOriginData={this.updateOriginData}
                  updateDestinationData={this.updateDestinationData}
                  updatePlacesSuggestions={this.updatePlacesSuggestions}
                />
                {this.state.destinationData.title !== undefined ? (
                  <UserSearchPlacesResults />
                ) : null}
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
