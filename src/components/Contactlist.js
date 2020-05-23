import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getContacts,
  deleteContact,
  toggleFavorite,
} from "../actions/contactActions";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import Contact from "./Contact";

class ContactList extends Component {
  componentDidMount() {
    this.props.getContacts(this.props.authReducer.subID);
  }

  onDeleteContact = (id) => {
    this.props.deleteContact(id, this.props.authReducer.subID);
  };

  onToggleFavorite = (id) => {
    console.log("From onToggleFavorite");
    this.props.toggleFavorite(id, this.props.authReducer.subID);
  };

  contactList = (filteredContacts) => {
    return filteredContacts.map((currentContact) => {
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

  favorites = (filteredContacts) => {
    return filteredContacts.map((currentContact) => {
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

  group = (filteredContacts) => {
    return filteredContacts.map((currentContact) => {
      if (currentContact.label === this.props.contactReducer.label)
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

  isFavorite = (contact) => contact.favorite === true;

  filter = () => {
    return this.props.contactReducer.contacts.filter((contact) => {
      return (
        contact.name
          .toLowerCase()
          .includes(this.props.contactReducer.search.toLowerCase()) ||
        contact.phoneNumber
          .toString()
          .includes(this.props.contactReducer.search) ||
        contact.address
          .toLowerCase()
          .includes(this.props.contactReducer.search.toLowerCase())
      );
    });
  };

  render() {
    let filteredContacts = this.filter();

    //If we search for contacts
    if (this.props.contactReducer.search !== "") {
      if (this.contactList(filteredContacts).length === 0)
        return (
          <div>
            <p className="lead">No results matched your search</p>
          </div>
        );
      else
        return (
          <div>
            <Row lg="4" sm="2" xs="2">
              {this.contactList(filteredContacts)}
            </Row>
          </div>
        );
    }

    //If we sort by label
    else if (this.props.contactReducer.label !== "") {
      return (
        <div>
          <div className="container">
            <h1>{this.props.contactReducer.label}</h1>
            <Row lg="4" sm="2" xs="2">
              {this.group(filteredContacts)}
            </Row>
          </div>
        </div>
      );
    }

    //Normal view - No search
    else
      return (
        <div>
          {filteredContacts.some(this.isFavorite) ? (
            <h3>
              Favorites <hr />
            </h3>
          ) : (
            ""
          )}
          <Row lg="4" md="3" sm="2" xs="2">
            {this.favorites(filteredContacts)}
          </Row>

          <h3>
            Contacts <hr />
          </h3>
          <Row lg="4" md="3" sm="2" xs="2">
            {this.contactList(filteredContacts)}
          </Row>
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
