import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";
import { setAuth, userLogin } from "../actions/authActions";
import { getContacts, setContactsLoading } from "../actions/contactActions";
import Error404 from "./404";
import ImageUploaderWidget from "./ImageUploaderWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";

class EditContact extends Component {
  state = {
    name: "",
    address: "",
    phoneNumber: 0,
    image: "",
    contactExists: false,
    disabledFields: true,
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
          image: contact[0].image,
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

  passBody = () => {
    return (
      <a style={{ color: "black", textDecoration: "none" }} href="">
        <FontAwesomeIcon
          icon={faCamera}
          className="fas fa-camera fa-2x"
        ></FontAwesomeIcon>
      </a>
    );
  };

  onImageSuccess = async (res) => {
    await res;
    this.setState({
      image: res,
    });
  };

  onEditClick = () => {
    this.setState({
      disabledFields: !this.state.disabledFields,
    });
  };

  render() {
    if (this.props.contactReducer.loading) return "";
    else if (this.state.contactExists)
      return (
        <div>
          <div className="text-center">
            <div>
              <img
                src={
                  this.state.image
                    ? "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_250,h_250/" +
                      this.state.image
                    : "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_250,h_250/https://res.cloudinary.com/mycontacts/image/upload/v1589640571/myContacts/g1gk0riburccmbjzxgzr.png"
                }
                data-holder-rendered="true"
              />
            </div>
            <ImageUploaderWidget
              onImageSuccess={this.onImageSuccess}
              passBody={this.passBody}
            />
            <h3>{this.state.name}</h3>
          </div>
          <form onSubmit={this.onSubmit}>
            <fieldset disabled={this.state.disabledFields}>
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
              <div className="form-group"></div>
            </fieldset>
            <input
              style={{ padding: "1%" }}
              type="submit"
              value="Save changes"
              className="btn btn-primary"
            />
            <a
              style={{ color: "black", textDecoration: "none" }}
              onClick={this.onEditClick}
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="fas fa-camera fa-2x"
              ></FontAwesomeIcon>
            </a>
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
