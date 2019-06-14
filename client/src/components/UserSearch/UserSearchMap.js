import React from "react";

class UserSearchMap extends React.Component {
  render() {
    return (
      <div className="mt-1">
        <iframe
          src="maps/search.html"
          title="hello"
          className="w-100"
          style={{ height: "600px", border: "none" }}
        />
      </div>
    );
  }
}
export default UserSearchMap;
