import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkedAlt,
  faPhoneAlt,
  faTrashAlt,
  faHeart as fasFaHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import DeleteContactModal from "../modals/DeleteContactModal";

class ContactCard extends Component {
  state = { deleteContactModalShow: false };
  render() {
    return (
      <Card style={{ marginBottom: "2vh" }}>
        <Link to={"/contact/" + this.props.contact._id}>
          <CardImg
            top
            width="100%"
            src={
              this.props.contact.image
                ? "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_thumb,w_300,h_350/" +
                  this.props.contact.image
                : "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_thumb,w_300,h_350/https://res.cloudinary.com/mycontacts/image/upload/v1589640571/myContacts/g1gk0riburccmbjzxgzr.png"
            }
            alt="Card image cap"
          />
        </Link>
        <CardBody>
          <CardTitle>
            <FontAwesomeIcon icon={faUser} />
            {"  "}
            {this.props.contact.name}
          </CardTitle>
          <CardText>
            <FontAwesomeIcon icon={faPhoneAlt} />
            {"  "}
            {this.props.contact.phoneNumber}
          </CardText>
          <CardText>
            <FontAwesomeIcon icon={faMapMarkedAlt} />
            {"  "}
            {this.props.contact.address}
          </CardText>
        </CardBody>
        <CardFooter className="text-muted text-right">
          <a
            style={{ color: "black", textDecoration: "none" }}
            href="http://localhost:3000/"
            onClick={() => {
              this.props.toggleFavorite(this.props.contact._id);
            }}
          >
            {this.props.contact.favorite ? (
              <FontAwesomeIcon icon={fasFaHeart} />
            ) : (
              <FontAwesomeIcon icon={farFaHeart} />
            )}{" "}
          </a>
          <a
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => this.setState({ deleteContactModalShow: true })}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> {"  "}
          </a>
          <DeleteContactModal
            show={this.state.deleteContactModalShow}
            onHide={() => this.setState({ deleteContactModalShow: false })}
            name={this.props.contact.name}
            onDelete={() => this.props.deleteContact(this.props.contact._id)}
          ></DeleteContactModal>
        </CardFooter>
      </Card>
    );
  }
}

export default ContactCard;
