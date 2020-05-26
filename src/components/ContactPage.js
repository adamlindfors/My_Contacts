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
  faUsers,
  faKey,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from "reactstrap";
import DeleteContactModal from "../modals/DeleteContactModal";

const InfoCard = (props) => (
  <div style={{ padding: "1vh" }}>
    <Card>
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
          className="form-control text-center"
          defaultValue={props.info}
          onChange={props.onChange}
        />
      </CardBody>
    </Card>
  </div>
);

class ContactPage extends Component {
  state = {
    name: "",
    address: "",
    phoneNumber: 0,
    image: "",
    work: "",
    email: "",
    birthday: "",
    doorCode: 0,
    contactExists: false,
    disabledEdit: true,
    relationship: "",
    label: "",
    id: "",
    deleteContactModalShow: false,
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
          doorCode: contact[0].doorCode,
          relationship: contact[0].relationship,
          label: contact[0].label,
          id: contact[0]._id,
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

  onChangeDoorCode = (e) => {
    this.setState({
      doorCode: e.target.value,
    });
  };

  onChangeRelationship = (e) => {
    this.setState({
      relationship: e.target.value,
    });
  };

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onDeleteContact = (id) => {
    this.props.deleteContact(id, this.props.authReducer.subID);

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
              <Row className="mobile">
                <Col md="6" sm="12" lg="4">
                  <img
                    src={
                      this.state.image
                        ? "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_300,h_300/" +
                          this.state.image
                        : "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_300,h_300/https://res.cloudinary.com/mycontacts/image/upload/v1589640571/myContacts/g1gk0riburccmbjzxgzr.png"
                    }
                    data-holder-rendered="true"
                    alt=""
                  />
                </Col>
                <Col md="6" sm="12" lg="8">
                  <input
                    className="form-control form-control-lg form-control-sm"
                    ref="userInput"
                    required
                    defaultValue={this.state.name}
                    onChange={this.onChangeName}
                    type="text-name"
                  ></input>
                </Col>
              </Row>

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
                      onClick={() =>
                        this.setState({ deleteContactModalShow: true })
                      }
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="fas fa-camera fa-2x"
                      ></FontAwesomeIcon>
                      <DeleteContactModal
                        show={this.state.deleteContactModalShow}
                        onHide={() =>
                          this.setState({ deleteContactModalShow: false })
                        }
                        name={this.state.name}
                        onDelete={() =>
                          this.props.deleteContact(
                            this.state.id,
                            this.props.authReducer.subID
                          )
                        }
                      ></DeleteContactModal>
                    </a>
                  </div>
                </div>
              </div>
              <hr />
              <Row lg="4" sm="2" md="3" xs="1">
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
                <InfoCard
                  info={this.state.doorCode}
                  icon={faKey}
                  onChange={this.onChangeDoorCode}
                  title={"Code"}
                />
                <InfoCard
                  info={this.state.relationship}
                  icon={faHeart}
                  onChange={this.onChangeRelationship}
                  title={"Status"}
                />
                <div style={{ padding: "1vh" }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <div className="text-center">
                          <h2>
                            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>{" "}
                            Group
                          </h2>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      {this.state.disabledEdit ? (
                        <input
                          type="text-form"
                          className="form-control text-center"
                          value={this.state.label}
                          readOnly
                        />
                      ) : (
                        <select
                          style={{ cursor: "pointer" }}
                          ref="userInput"
                          className="form-control"
                          value={this.state.label}
                          onChange={this.onChangeLabel}
                        >
                          {this.props.labelReducer.labels.map((label) => {
                            return (
                              <option key={label} value={label}>
                                {label}     
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </Row>
              <div className="text-center" style={{ margin: "5vh" }}>
                <input
                  type="submit"
                  value="Save changes"
                  className="btn btn-primary btn-lg"
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

ContactPage.propTypes = {
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
  labelReducer: state.labelReducer,
});

export default connect(mapStateToProps, {
  setAuth,
  userLogin,
  getContacts,
  setContactsLoading,
  deleteContact,
})(withAuth(ContactPage));
