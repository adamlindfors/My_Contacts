import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";
import { setAuth, userLogin } from "../actions/authActions";
import {
  getContacts,
  setContactsLoading,
  deleteContact,
} from "../actions/contactActions";
import Error404 from "./404";
import ImageUploaderWidget from "./ImageUploaderWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEdit,
  faTrashAlt,
  faMapMarkedAlt,
  faPhoneAlt,
  faBirthdayCake,
  faBriefcase,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap";

const InfoCard = (props) => (
  <div style={{ padding: "23px" }}>
    <Card style={{ width: "110%" }}>
      <CardHeader>
        <CardTitle>
          <div className="text-center">
            <h2>
              <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
              {"  " + props.title}
            </h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <input
          type="text-form"
          className="form-control"
          value={props.info}
          onChange={props.onChange}
        />
      </CardBody>
    </Card>
  </div>
);

class EditContact extends Component {
  state = {
    name: "",
    address: "",
    phoneNumber: 0,
    image: "",
    work: "",
    email: "",
    birthday: "",
    contactExists: false,
    disabledEdit: true,
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
          work: contact[0].work,
          email: contact[0].email,
          birthday: contact[0].birthday,
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

  onChangeWork = (e) => {
    this.setState({
      work: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangeBirthday = (e) => {
    this.setState({
      birthday: e.target.value,
    });
  };

  onChangePhoneNumber = (e) => {
    this.setState({
      phoneNumber: e.target.value,
    });
  };

  onDeleteContact = () => {
    if (window.confirm("Do you want to delete this contact?")) {
      this.props.deleteContact(
        this.props.match.params.id,
        this.props.authReducer.subID
      );
    }
    window.location = "/";
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
      <FontAwesomeIcon
        icon={faCamera}
        className="fas fa-camera fa-2x"
      ></FontAwesomeIcon>
    );
  };

  onImageSuccess = async (res) => {
    await res;
    this.setState({
      image: res,
    });
  };

  onEditClick = () => {
    if (this.state.disabledEdit) {
      this.setState({
        disabledEdit: !this.state.disabledEdit,
      });
    } else {
      this.setState({
        disabledEdit: !this.state.disabledEdit,
      });
    }
  };

  render() {
    if (this.props.contactReducer.loading) return "";
    else if (this.state.contactExists)
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <fieldset disabled={this.state.disabledEdit}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <img
                    src={
                      this.state.image
                        ? "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_300,h_300/" +
                          this.state.image
                        : "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_300,h_300/https://res.cloudinary.com/mycontacts/image/upload/v1589640571/myContacts/g1gk0riburccmbjzxgzr.png"
                    }
                    data-holder-rendered="true"
                  />
                </div>
                <div className="col ">
                  <input
                    className="form-control form-control-lg"
                    ref="userInput"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    type="text-name"
                  ></input>
                </div>
              </div>

              <div className="text-center">
                <div className="d-flex justify-content-center">
                  <div
                    style={{
                      borderRight: "1px solid #D3D3D3",
                      paddingRight: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <a
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={this.onEditClick}
                    >
                      {/* Edit Button */}
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="fas fa-edit fa-2x"
                      ></FontAwesomeIcon>
                    </a>
                  </div>

                  <div
                    style={{
                      borderRight: "1px solid #D3D3D3",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    {/* Camera Button */}

                    <ImageUploaderWidget
                      onImageSuccess={this.onImageSuccess}
                      passBody={this.passBody}
                    />
                  </div>
                  <div style={{ paddingLeft: "15px", cursor: "pointer" }}>
                    {/* Delete Button */}
                    <a
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={this.onDeleteContact}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="fas fa-camera fa-2x"
                      ></FontAwesomeIcon>
                    </a>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <InfoCard
                  info={this.state.address}
                  icon={faMapMarkedAlt}
                  onChange={this.onChangeAddress}
                  title={"Address"}
                />
                <InfoCard
                  info={this.state.phoneNumber}
                  icon={faPhoneAlt}
                  onChange={this.onChangePhoneNumber}
                  title={"Number"}
                />
                <InfoCard
                  info={this.state.email}
                  icon={faEnvelope}
                  onChange={this.onChangeEmail}
                  title={"Email"}
                />
                <InfoCard
                  info={this.state.birthday}
                  icon={faBirthdayCake}
                  onChange={this.onChangeBirthday}
                  title={"Birthday"}
                />
                <InfoCard
                  info={this.state.work}
                  icon={faBriefcase}
                  onChange={this.onChangeWork}
                  title={"Work"}
                />
              </div>
              <div className="text-center">
                <input
                  style={{ padding: "1%" }}
                  type="submit"
                  value="Save changes"
                  className="btn btn-primary"
                />
              </div>
            </fieldset>
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
  deleteContact,
})(withAuth(EditContact));
