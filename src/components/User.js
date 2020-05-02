import React, { Component } from "react";

class Staff extends Component {
  state = {
    Name: "",
  };

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem("okta-token-storage"))
      .idToken;
    this.setState({
      Name: idToken.claims.name,
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.state.Name}</h1>
      </div>
    );
  }
}

export default Staff;
