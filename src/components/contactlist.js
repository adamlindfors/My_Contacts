import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getContacts, deleteContact } from "../actions/contactActions";
import PropTypes from "prop-types";

const Contact = (props) => (
  <tr>
    <td>{props.contact.name}</td>
    <td>{props.contact.address}</td>
    <td>{props.contact.phoneNumber}</td>
    <td>
      <Link to={"/edit/" + props.contact._id}>edit</Link> |{" "}
      {/* Should be a real button */}
      <a
        href="#"
        onClick={() => {
          props.deleteContact(props.contact._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

class ContactList extends Component {
  componentDidMount() {
    //Fixa så authenticated user skickas
    this.props.getContacts();
  }

  onDeleteContact = (id) => {
    this.props.deleteContact(id);
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
              <th>name</th>
              <th>Address</th>
              <th>Phone number</th>
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
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
});

//Connect component to the store
export default connect(mapStateToProps, { getContacts, deleteContact })(
  ContactList
);
