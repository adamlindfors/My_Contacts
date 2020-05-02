import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EditContact extends Component {
  state = {
    name: "",
    address: "",
    phoneNumber: 0,
  };

  componentDidMount() {
    const contact = this.props.contactReducer.contacts.filter(
      (contact) => contact._id === this.props.match.params.id
    );
    console.log(contact[0]);
    if (contact[0]) {
      this.setState({
        name: contact[0].name,
        address: contact[0].address,
        phoneNumber: contact[0].phoneNumber,
      });
    }
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
    axios
      .post("/contacts/update/" + this.props.match.params.id, this.state, {
        params: {
          subID: this.props.authReducer.subID,
        },
      })
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

EditContact.propTypes = {
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(EditContact);
