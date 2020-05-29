import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";
import Contactlist from "./Contactlist";
import User from "./User";
import { connect } from "react-redux";
import { logoutContacts } from "../actions/contactActions";
import { setAuth, userLogin, userLogout } from "../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ContactsLogo from "../assets/Contacts.png";

class Home extends Component {
  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.props.authReducer.Authenticated) {
      this.props.setAuth(authenticated);
    }
  };

  async componentDidMount() {
    await this.checkAuthentication();
    if (this.props.authReducer.Authenticated) {
      this.props.userLogin();
    }
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async () => {
    this.props.auth.login("/");
  };

  logout = async () => {
    await this.props.auth.logout("/");
    this.props.userLogout();
    this.props.logoutContacts();
  };

  render() {
    if (this.props.authReducer.authenticated === null) return null;
    const mainContent = this.props.authReducer.subID ? (
      <div>
        {this.props.contactReducer.search === "" &&
        this.props.labelReducer.label === "" ? (
          <h1>
            <User />
          </h1>
        ) : (
          ""
        )}
        <Contactlist />
      </div>
    ) : (
      <div className="bg jumbotron">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <Link to="/" className="navbar-brand">
                <img src={ContactsLogo} alt="logo" style={{ width: "5vh" }} />
              </Link>
              <h1 className="font-weight-light">Welcome to My Contacts</h1>
              <p className="lead">
                A great way to store information about your family and friends.
              </p>
              <button className="btn btn-dark btn-lg mr-2" onClick={this.login}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    return <div>{mainContent}</div>;
  }
}

Home.propTypes = {
  logoutContacts: PropTypes.func.isRequired,
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
  labelReducer: state.labelReducer,
});

//Connect component to the store
export default connect(mapStateToProps, {
  logoutContacts,
  setAuth,
  userLogin,
  userLogout,
})(withAuth(Home));
