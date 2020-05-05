import React, { Component } from "react";
import { Col } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class User extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          className="rounded-circle"
          alt="100x100"
          src="https://media-exp1.licdn.com/dms/image/C4E03AQH45Z9JaBvQoA/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=e7iaZhxscfwieL_vu0TR4JTfAdgFmPvBLsiALt5AwxI"
          data-holder-rendered="true"
        />
        <h1>Welcome {this.props.authReducer.user}</h1>
      </div>
    );
  }
}

User.propTypes = {
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(User);
