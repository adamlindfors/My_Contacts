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
                  Create New
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="btn nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Groups
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.props.contactReducer.labels.map((label) => {
                    return (
                      <button
                        className={
                          label === this.props.contactReducer.label
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => this.props.setLabel(label)}
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
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <button className="btn btn my-2 my-sm-0" onClick={this.login}>
                  Register
                </button>
              </li>
              <li class="nav-item">
                <button className="btn btn my-2 my-sm-0" onClick={this.login}>
                  Sign In {"  "}
                  <FontAwesomeIcon icon={faSignInAlt} />
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
      //   <div className="container">
      //     <div>
      //       <a className="navbar-brand" href="http://localhost:3000/">
      //         <img src={ContactsLogo} alt="logo" style={{ width: "30px" }} />
      //       </a>
      //       <Link to="/" className="navbar-brand">
      //         My Contacts
      //       </Link>
      //     </div>
      //     {/* If user is logged in */}
      //     {this.props.authReducer.subID ? (
      //       <div className="collpase navbar-collapse">
      //         <ul className="navbar-nav mr-auto">
      //           <li className="navbar-item">
      //             <Link to="/create" className="nav-link">
      //               Create New Contact
      //             </Link>
      //           </li>
      //         </ul>
      //         <div>
      //           <ul className="navbar-nav mr-auto">
      //             <li className="navbar-item" style={{ paddingRight: "5px" }}>
      //               <Dropdown>
      //                 <Dropdown.Toggle variant="secondary" id="dropdown-basic">
      //                   Groups
      //                 </Dropdown.Toggle>
      //                 <Dropdown.Menu>
      //                   {this.props.contactReducer.labels.map((label) => {
      //                     return (
      //                       <Dropdown.Item
      //                         active={
      //                           label === this.props.contactReducer.label
      //                             ? true
      //                             : false
      //                         }
      //                         key={label}
      //                         onClick={() => this.props.setLabel(label)}
      //                       >
      //                         {label}
      //                       </Dropdown.Item>
      //                     );
      //                   })}
      //                   <Dropdown.Divider />
      //                   <Dropdown.Item onClick={() => this.props.setLabel("")}>
      //                     Show All
      //                   </Dropdown.Item>
      //                   <Dropdown.Item
      //                     onClick={() =>
      //                       this.setState({ deleteLabelModalShow: true })
      //                     }
      //                   >
      //                     Delete a Group
      //                   </Dropdown.Item>
      //                   <DeleteLabelModal
      //                     show={this.state.deleteLabelModalShow}
      //                     onHide={() =>
      //                       this.setState({ deleteLabelModalShow: false })
      //                     }
      //                   ></DeleteLabelModal>
      //                   <Dropdown.Item
      //                     onClick={() =>
      //                       this.setState({ labelModalShow: true })
      //                     }
      //                   >
      //                     Create New Group
      //                   </Dropdown.Item>
      //                   <AddLabelModal
      //                     show={this.state.labelModalShow}
      //                     onHide={() =>
      //                       this.setState({ labelModalShow: false })
      //                     }
      //                   ></AddLabelModal>
      //                 </Dropdown.Menu>
      //               </Dropdown>
      //             </li>
      //             <li className="navbar-item">
      //               <input
      //                 className="form-control mr-sm-5"
      //                 type="text"
      //                 placeholder="Search"
      //                 value={this.props.contactReducer.search}
      //                 onChange={this.onChangeSearch}
      //               />
      //             </li>
      //           </ul>
      //         </div>
      //         <button
      //           className="btn btn-dark my-2 my-sm-0"
      //           onClick={this.logout}
      //         >
      //           Logout {"  "}
      //           <FontAwesomeIcon icon={faSignOutAlt} />
      //         </button>
      //       </div>
      //     ) : (
      //       <div>
      //         <button
      //           className="btn btn-dark my-2 my-sm-0"
      //           onClick={this.login}
      //         >
      //           Sign Up |
      //         </button>
      //         <button
      //           className="btn btn-dark my-2 my-sm-0"
      //           onClick={this.login}
      //         >
      //           Login {"  "}
      //           <FontAwesomeIcon icon={faSignInAlt} />
      //         </button>
      //       </div>
      //     )}
      //   </div>
      // </nav>
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
  getLabels,
  setLabel,
})(withAuth(Navbar));
