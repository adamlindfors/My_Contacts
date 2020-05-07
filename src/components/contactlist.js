import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getContacts,
  deleteContact,
  toggleFavorite,
} from "../actions/contactActions";
import PropTypes from "prop-types";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardText,
  CardFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkedAlt,
  faPhoneAlt,
  faEdit,
  faTrashAlt,
  faHeart as fasFaHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";

const Contact = (props) => (
  <Col xs="3" style={{ padding: "1%" }}>
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
          <CardTitle>
            <FontAwesomeIcon icon={faUser} /> {props.contact.name}
          </CardTitle>
          <CardText>
            <FontAwesomeIcon icon={faPhoneAlt} />
            {props.contact.phoneNumber}
          </CardText>
          <CardText>
            <FontAwesomeIcon icon={faMapMarkedAlt} />
            {props.contact.address}
          </CardText>
        </CardBody>
        <CardFooter className="text-muted text-right">
          <a
            style={{ color: "black", textDecoration: "none" }}
            href=""
            onClick={() => {
              props.toggleFavorite(props.contact._id);
            }}
          >
            {props.contact.favorite ? (
              <FontAwesomeIcon icon={fasFaHeart} />
            ) : (
              <FontAwesomeIcon icon={farFaHeart} />
            )}{" "}
          </a>
          <a
            style={{ color: "black", textDecoration: "none" }}
            href=""
            onClick={() => {
              props.deleteContact(props.contact._id);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> {"  "}
          </a>
        </CardFooter>
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

  onToggleFavorite = (id) => {
    console.log("From onToggleFavorite");
    this.props.toggleFavorite(id, this.props.authReducer.subID);
  };

  contactList = () => {
    return this.props.contactReducer.contacts.map((currentContact) => {
      return (
        <Contact
          contact={currentContact}
          deleteContact={this.onDeleteContact}
          toggleFavorite={this.onToggleFavorite}
          key={currentContact._id}
        />
      );
    });
  };

  favorites = () => {
    return this.props.contactReducer.contacts.map((currentContact) => {
      if (currentContact.favorite)
        return (
          <Contact
            contact={currentContact}
            deleteContact={this.onDeleteContact}
            toggleFavorite={this.onToggleFavorite}
            key={currentContact._id}
          />
        );
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="text-center">Favorites</h3>
          <Row>{this.favorites()}</Row>
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
  toggleFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
});

//Connect component to the store
export default connect(mapStateToProps, {
  getContacts,
  deleteContact,
  toggleFavorite,
})(ContactList);
