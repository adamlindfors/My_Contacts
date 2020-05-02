import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";
import Contactlist from "./Contactlist";
import User from "./User";
import { connect } from "react-redux";
import { logoutContacts } from "../actions/contactActions";
import { setAuth, userLogin, userLogout } from "../actions/authActions";
import PropTypes from "prop-types";

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
    if (this.props.authReducer.subID === null) return null;

    const mainContent = this.props.authReducer.Authenticated ? (
      <div>
        <h1>
          <User />
        </h1>
        <Contactlist />
        <button className="btn btn-light btn-lg" onClick={this.logout}>
          Logout
        </button>
      </div>
    ) : (
      <div>
        <div>
          <h1 className="display-4">My Contacts</h1>
          <p className="lead">
            My Contacts helps you store important info about your family and
            friends.
          </p>
        </div>
        <div className="">
          <button className="btn btn-dark btn-lg mr-2" onClick={this.login}>
            Login
          </button>
          <button className="btn btn-dark btn-lg" onClick={this.login}>
            Sign up
          </button>
        </div>
      </div>
    );

    return <div className="jumbotron">{mainContent}</div>;
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
});

//Connect component to the store
export default connect(mapStateToProps, {
  logoutContacts,
  setAuth,
  userLogin,
  userLogout,
})(withAuth(Home));
