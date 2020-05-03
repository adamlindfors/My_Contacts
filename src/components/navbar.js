import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import { logoutContacts } from "../actions/contactActions";
import { userLogin, userLogout } from "../actions/authActions";
import PropTypes from "prop-types";

class Navbar extends Component {
  login = async () => {
    this.props.auth.login("/");
  };

  logout = async () => {
    this.props.userLogout();
    this.props.logoutContacts();
    await this.props.auth.logout("/");
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
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
            <button className="btn btn-dark my-2 my-sm-0" onClick={this.logout}>
              Logout
            </button>
          ) : (
            <div>
              <button
                className="btn btn-dark my-2 my-sm-0"
                onClick={this.login}
              >
                Login
              </button>
              <button
                className="btn btn-dark my-2 my-sm-0"
                onClick={this.login}
              >
                Sign Up
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
})(withAuth(Navbar));
