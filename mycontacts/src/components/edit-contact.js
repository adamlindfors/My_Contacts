import React, { Component } from "react";
import axios from "axios";

class EditContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      phoneNumber: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/contacts/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          address: response.data.address,
          phoneNumber: response.data.phoneNumber,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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

    const contact = {
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
    };

    axios
      .post(
        "http://localhost:5000/contacts/update/" + this.props.match.params.id,
        contact
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Edit contact</h3>
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
              value="Save changes"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditContact;
