import React from "react";

//Importing Context
import UserSearchContext from "./UserSearchContext";

//Bootstrap Components
import { Form } from "react-bootstrap";

//Components
import UserSearchResultsPlaces from "./UserSearchResultsPlaces";

// Dummy data for now
const data = {
  idk: {
    id: 1,
    createdAt: new Date(),
    title: "Details of this place"
  },
  another: {
    id: 2,
    createdAt: new Date("2010-10-10"),
    title: "thing 2"
  },
  more: {
    id: 3,
    createdAt: new Date("2011-11-11"),
    title: "thing 3"
  }
};

class UserSearchResults extends React.Component {
  render() {
    return (
      <div>
        <p className="text-secodary font-weight-bold text-secondary small">
          Book a cab to {this.context.destinationData.title}
        </p>
        {/* Showing Booking Form */}
        <div className="border border-muted p-2 mb-3">
          <Form>
            <Form.Group controlId="fromLocation">
              <Form.Label className="text-secondary small">FROM</Form.Label>
              <Form.Control
                type="search"
                placeholder="Type a place or pick from map"
              />
            </Form.Group>
            <Form.Group controlId="ToLocation">
              <Form.Label className="text-secondary small">TO</Form.Label>
              <Form.Control
                type="search"
                placeholder="Type a place or pick from map"
                defaultValue={this.context.destinationData.title}
              />
            </Form.Group>
          </Form>
        </div>
        {/* Showing results */}
        <p className="text-secondary small">
          Showing results for{" "}
          <span className="font-weight-bold">
            {this.context.destinationData.title}
          </span>
        </p>
        <div className="border border-muted p-2 mt-1">
          {/* Each result */}
          {Object.keys(data).map((key, index) => (
            <UserSearchResultsPlaces key={index} cat={data[key]} />
          ))}
          <hr />
        </div>
      </div>
    );
  }
}
UserSearchResults.contextType = UserSearchContext;
export default UserSearchResults;
