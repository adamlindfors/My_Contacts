import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import Contactlist from "./Contactlist";

export default withAuth(
  class Home extends Component {
    state = { authenticated: null };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login("/");
    };

    logout = async () => {
      this.props.auth.logout("/");
    };

    render() {
      if (this.state.authenticated === null) return null;

      const mainContent = this.state.authenticated ? (
        <div>
          <Contactlist />
          <button className="btn btn-light btn-lg" onClick={this.logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <div>
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

      return (
        <div className="jumbotron">
          <h1 className="display-4">My Contacts</h1>
          {mainContent}
        </div>
      );
    }
  }
);
