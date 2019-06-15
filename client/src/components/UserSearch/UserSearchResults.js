import React from "react";

//Importing Context
import UserSearchContext from "./UserSearchContext";

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
        {/* Showing results */}
        <div hidden={this.props.isOpen}>
          <p className="text-secondary small">
            Showing results for{" "}
            <span className="font-weight-bold text-primary">
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
      </div>
    );
  }
}
UserSearchResults.contextType = UserSearchContext;
export default UserSearchResults;
