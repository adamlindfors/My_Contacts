import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getContacts, deleteContact } from "../actions/contactActions";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkedAlt,
  faPhoneAlt,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const Contact = (props) => (
  <tr>
    <td>{props.contact.name}</td>
    <td>{props.contact.address}</td>
    <td>{props.contact.phoneNumber}</td>
    <td>
      <Link
        to={"/edit/" + props.contact._id}
        style={{ color: "black", textDecoration: "none" }}
      >
        {" "}
        <FontAwesomeIcon icon={faEdit} /> {"  "}
      </Link>{" "}
      | {/* Should be a real button */}
      <a
        style={{ color: "black", textDecoration: "none" }}
        href=""
        onClick={() => {
          props.deleteContact(props.contact._id);
        }}
      >
        <FontAwesomeIcon icon={faTrashAlt} /> {"  "}
      </a>
    </td>
  </tr>
);

class ContactList extends Component {
  componentDidMount() {
    this.props.getContacts(this.props.authReducer.subID);
  }

  onDeleteContact = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
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
        <h3>Contacts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>
                <FontAwesomeIcon icon={faUser} /> {"  "}
                Name
              </th>
              <th>
                {" "}
                <FontAwesomeIcon icon={faMapMarkedAlt} /> {"  "}
                Address
              </th>
              <th>
                {" "}
                <FontAwesomeIcon icon={faPhoneAlt} /> {"  "}
                Phone number
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.contactList()}</tbody>
        </table>
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
