import React from "react";
import UserSearchContext from "./UserSearchContext";

class UserSearchMap extends React.Component {
  constructor() {
    super();
    this.state = {
      baseURL: "maps/search.html?"
    };
  }
  render() {
    // Url for the ma.Sending data in the url
    const url =
      this.state.baseURL +
      "destinationLat=" +
      this.context.destinationData.destinationLat +
      "&" +
      "destinationLon=" +
      this.context.destinationData.destinationLon +
      "&" +
      "destinationIcon=" +
      this.context.destinationData.icon;

    console.log(url);
    return (
      <div className="mt-1">
        <iframe
          src={url}
          title="hello"
          className="w-100"
          style={{ height: "600px", border: "none" }}
        />
      </div>
    );
  }
}
UserSearchMap.contextType = UserSearchContext;
export default UserSearchMap;
