import React, { Component } from "react";
import { addContact } from "../actions/contactActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImageUploaderWidget from "./ImageUploaderWidget";

class CreateContact extends Component {
  state = {
    name: "",
    address: "",
    phoneNumber: 0,
    image: "",
  };

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

  onImageSuccess = async (res) => {
    await res;
    this.setState({
      image: res,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      image: this.state.image,
    };

    this.props.addContact(newContact, this.props.authReducer.subID);

    window.location = "/";
  };

  passBody = () => {
    return <button>Upload Image</button>;
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
        <ImageUploaderWidget
          onImageSuccess={this.onImageSuccess}
          passBody={this.passBody}
        />
      </div>
    );
  }
}

CreateContact.propTypes = {
  addContact: PropTypes.func.isRequired,
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { addContact })(CreateContact);
