import React, { Component } from "react";
import axios from "axios";

class CreateContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      phoneNumber: 0,
    };
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  onChangePhoneNumber = (e) => {
    this.setState({
      phoneNumber: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    //Kan vi inte bara slänga in this.state direkt i .post() ?
    const contact = {
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
    };

    console.log(contact);

    axios
      .post("http://localhost:5000/contacts/add", contact)
      .then((res) => console.log(res.data));

    //fult?
    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Add a new contact</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              ref="userInput"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            ></input>
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <label>Telephone Number: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.phoneNumber}
              onChange={this.onChangePhoneNumber}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Save new contact"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateContact;
