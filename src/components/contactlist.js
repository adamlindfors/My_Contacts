import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getContacts, deleteContact } from "../actions/contactActions";
import PropTypes from "prop-types";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkedAlt,
  faPhoneAlt,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";


const Contact = (props) => (
  <Col xs="3">
    <div>
      <Card>
        <Link to={"/edit/" + props.contact._id}>
          <CardImg
            top
            width="100%"
            src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
            alt="Card image cap"
          />
        </Link>
        <CardBody>
          <CardTitle>Name: {props.contact.name}</CardTitle>
          <CardText>Phonenumber: {props.contact.phoneNumber}</CardText>
        </CardBody>
      </Card>
    </div>
  </Col>
);

class ContactList extends Component {
  componentDidMount() {
    this.props.getContacts(this.props.authReducer.subID);
  }

  onDeleteContact = (id) => {
    if (window.confirm("Do you want to delete this contact?")) {
      this.props.deleteContact(id, this.props.authReducer.subID);
    }
  };

  contactList = () => {
    return this.props.contactReducer.contacts.map((currentContact) => {
      return (
        <Contact
          contact={currentContact}
          deleteContact={this.onDeleteContact}
          key={currentContact._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="text-center">Contacts</h3>

          <Row>{this.contactList()}</Row>
        </div>
      </div>
    );
  }
}

ContactList.propTypes = {
  getContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
});

//Connect component to the store
export default connect(mapStateToProps, { getContacts, deleteContact })(
  ContactList
);
