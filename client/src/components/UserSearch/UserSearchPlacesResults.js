import React from "react";

// importing context
import UserSearchContext from "./UserSearchContext";

// Components
import UserSearchPlacesResultsData from "./UserSearchPlacesResultsData";

class UserSearchPlacesResults extends React.Component {
  render() {
    return (
      <div className="mt-3">
        <p className="text-secodary font-weight-bold text-secondary small">
          Places Near{" "}
          <span className="text-primary">
            {this.context.destinationData.title}
          </span>
        </p>

        {/* Box */}
        <div className="mt-1 border border-muted p-2">
          {this.context.placesSuggestions.map((details, index) => {
            return (
              <UserSearchPlacesResultsData
                data={details}
                key={index}
                updateDestinationData={data => {
                  this.props.updateDestinationData(data);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
UserSearchPlacesResults.contextType = UserSearchContext;
export default UserSearchPlacesResults;
