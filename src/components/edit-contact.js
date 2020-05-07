import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";
import { setAuth, userLogin } from "../actions/authActions";
import { getContacts, setContactsLoading } from "../actions/contactActions";
import Error404 from "./404";

class EditContact extends Component {
  state = {
    name: "",
    address: "",
    phoneNumber: 0,
    contactExists: false,
  };

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.props.authReducer.Authenticated) {
      this.props.setAuth(authenticated);
    }
  };

  async componentDidMount() {
    this.props.setContactsLoading();
    await this.checkAuthentication();
    if (this.props.authReducer.Authenticated) {
      await this.props.userLogin();
    }
    this.props.getContacts(this.props.authReducer.subID);
  }

  //When the props are loaded from the store
  componentDidUpdate(prevProps) {
    if (prevProps.contactReducer !== this.props.contactReducer) {
      const contact = this.props.contactReducer.contacts.filter(
        (contact) => contact._id === this.props.match.params.id
      );
      if (contact[0]) {
        this.setState({
          contactExists: true,
          name: contact[0].name,
          address: contact[0].address,
          phoneNumber: contact[0].phoneNumber,
        });
      }
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
    if (this.props.contactReducer.loading) return "";
    else if (this.state.contactExists)
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
    else
      return (
        <div>
          <Error404 />
        </div>
      );
  }
}

EditContact.propTypes = {
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {
  setAuth,
  userLogin,
  getContacts,
  setContactsLoading,
})(withAuth(EditContact));
