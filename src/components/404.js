import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";
import { setAuth, userLogin } from "../actions/authActions";

class Error404 extends Component {
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

  render() {
    return (
      <div className="jumbotron">
        <h1>This page is not available</h1>
        <p>The link may be broken or the page may have been deleted.</p>
      </div>
    );
  }
}

Error404.propTypes = {
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  logoutContacts: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
});

//Connect component to the store
export default connect(mapStateToProps, {
  setAuth,
  userLogin,
})(withAuth(Error404));
