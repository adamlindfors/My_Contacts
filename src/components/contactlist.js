import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//Contact component. Maybe put in its own file.
//Props = contact and deleteContact
//key = contactID
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
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/contacts/")
      .then((response) => {
        this.setState({ contacts: response.data });
        //test
        console.log(this.state.contacts);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteContact = (id) => {
    axios.delete("http://localhost:5000/contacts/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      contacts: this.state.contacts.filter((del) => del._id !== id),
    });
  };

  contactList = () => {
    return this.state.contacts.map((currentContact) => {
      return (
        <Contact
          contact={currentContact}
          deleteContact={this.deleteContact}
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

export default ContactList;
