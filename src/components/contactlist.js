import React, { Component } from "react";
import { connect } from "react-redux";
import { getContacts, deleteContact } from "../actions/contactActions";
import PropTypes from "prop-types";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

const Contact = (props) => (
  <Col xs="3">
    <Card>
      <CardImg
        top
        width="100%"
        src="https://img.huffingtonpost.com/asset/5dcc613f1f00009304dee539.jpeg?cache=QaTFuOj2IM&ops=crop_834_777_4651_2994%2Cscalefit_720_noupscale&format=webp"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{props.contact.name}</CardTitle>
        <CardText>Some quick example text</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  </Col>
);

class ContactList extends Component {
  componentDidMount() {
    this.props.getContacts(this.props.authReducer.subID);
  }

  onDeleteContact = (id) => {
    this.props.deleteContact(id, this.props.authReducer.subID);
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
        <thead className="thead-light"></thead>
        <Container>
          <Row>{this.contactList()}</Row>
        </Container>
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
