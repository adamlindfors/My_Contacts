import React, { Component } from "react";

class Staff extends Component {
  state = {
    Name: "",
  };

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    console.log(idToken);
    this.setState({
      Name: idToken.idToken.claims.name,
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
