import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import { logoutContacts, searchContact } from "../actions/contactActions";
import { userLogin, userLogout } from "../actions/authActions";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ContactsLogo from "../assets/Contacts.png";
import Dropdown from "react-bootstrap/Dropdown";

class Navbar extends Component {
  login = async () => {
    this.props.auth.login("/");
  };

  logout = async () => {
    await this.props.auth.logout("/");
    this.props.userLogout();
    this.props.logoutContacts();
  };

  onChangeSearch = (e) => {
    this.props.searchContact(e.target.value);
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
        {/* Försvinner när man loggar in */}
        <a className="navbar-brand" href="">
          <img src={ContactsLogo} alt="logo" style={{ width: "35px" }} />
        </a>
        <Link to="/" className="navbar-brand">
          My Contacts
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              {this.props.authReducer.subID ? (
                <Link to="/create" className="nav-link">
                  Create New Contact
                </Link>
              ) : (
                ""
              )}
            </li>
          </ul>
          {this.props.authReducer.subID ? (
            <div>
              <ul className="navbar-nav mr-auto">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Groups
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {this.props.contactReducer.contacts.map((contact) => {
                      return (
                        <Dropdown.Item
                          key={contact._id}
                          onClick={() => this.props.searchContact(contact.name)}
                        >
                          {contact.name}
                        </Dropdown.Item>
                      );
                    })}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => console.log("New Group?")}>
                      Create New
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <li className="navbar-item">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    value={this.props.contactReducer.search}
                    onChange={this.onChangeSearch}
                  />
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          {this.props.authReducer.subID ? (
            <button className="btn btn-dark my-2 my-sm-0" onClick={this.logout}>
              Logout {"  "}
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          ) : (
            <div>
              <button
                className="btn btn-dark my-2 my-sm-0"
                onClick={this.login}
              >
                Sign Up |
              </button>
              <button
                className="btn btn-dark my-2 my-sm-0"
                onClick={this.login}
              >
                Login {"  "}
                <FontAwesomeIcon icon={faSignInAlt} />
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutContacts: PropTypes.func.isRequired,
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  contactReducer: state.contactReducer,
});

//Connect component to the store
export default connect(mapStateToProps, {
  userLogin,
  userLogout,
  logoutContacts,
  searchContact,
})(withAuth(Navbar));
