import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import {
  logoutContacts,
  searchContact,
  getLabels,
  setLabel,
} from "../actions/contactActions";
import { userLogin, userLogout } from "../actions/authActions";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ContactsLogo from "../assets/Contacts.png";
import AddLabelModal from "../modals/AddLabelModal";
import DeleteLabelModal from "../modals/DeleteLabelModal";

class Navbar extends Component {
  state = { labelModalShow: false, deleteLabelModalShow: false };

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

  componentDidUpdate(prevProps) {
    if (prevProps.authReducer.subID !== this.props.authReducer.subID) {
      this.props.getLabels(this.props.authReducer.subID);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => this.props.setLabel("")}
        >
          <img src={ContactsLogo} alt="logo" style={{ width: "30px" }} />
        </Link>
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => this.props.setLabel("")}
        >
          My Contacts
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {this.props.authReducer.subID ? (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => this.props.setLabel("")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create Contact
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Groups
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.props.labelReducer.labels.map((label) => {
                    return (
                      <button
                        className={
                          label === this.props.labelReducer.label
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => this.props.setLabel(label)}
                        key={label}
                      >
                        {label}
                      </button>
                    );
                  })}
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item"
                    onClick={() => this.props.setLabel("")}
                  >
                    Show All
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      this.setState({ deleteLabelModalShow: true })
                    }
                  >
                    Delete a Group
                  </button>
                  <DeleteLabelModal
                    show={this.state.deleteLabelModalShow}
                    onHide={() =>
                      this.setState({ deleteLabelModalShow: false })
                    }
                  ></DeleteLabelModal>
                  <button
                    className="dropdown-item"
                    onClick={() => this.setState({ labelModalShow: true })}
                  >
                    Create New
                  </button>
                  <AddLabelModal
                    show={this.state.labelModalShow}
                    onHide={() => this.setState({ labelModalShow: false })}
                  ></AddLabelModal>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={this.props.contactReducer.search}
                onChange={this.onChangeSearch}
                size="30"
              />
            </form>
            <button className="btn my-2 my-sm-0" onClick={this.logout}>
              Log out {"  "}
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        ) : (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="btn btn my-2 my-sm-0" onClick={this.login}>
                  Register
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn my-2 my-sm-0" onClick={this.login}>
                  Sign In {"  "}
                  <FontAwesomeIcon icon={faSignInAlt} />
                </button>
              </li>
            </ul>
          </div>
        )}
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
  labelReducer: state.labelReducer,
});

//Connect component to the store
export default connect(mapStateToProps, {
  userLogin,
  userLogout,
  logoutContacts,
  searchContact,
  getLabels,
  setLabel,
})(withAuth(Navbar));
