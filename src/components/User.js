import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImageUploaderWidget from "./ImageUploaderWidget";
import { addUserImage, getUserImage } from "../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

class User extends Component {
  componentDidMount() {
    this.props.getUserImage(this.props.authReducer.subID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authReducer.image !== this.props.authReducer.image) {
      this.props.getUserImage(this.props.authReducer.subID);
    }
  }

  onImageSuccess = async (res) => {
    await res;
    this.props.addUserImage(res, this.props.authReducer.subID);
  };
  passBody = () => {
    return (
      <FontAwesomeIcon
        icon={faCamera}
        className="fas fa-camera fa-sm"
        style={{ cursor: "pointer" }}
      ></FontAwesomeIcon>
    );
  };
  render() {
    return (
      <div>
        <div className="text-center">
          <div>
            <img
              src={this.props.authReducer.image}
              data-holder-rendered="true"
              alt="User"
            />
          </div>
          <ImageUploaderWidget
            onImageSuccess={this.onImageSuccess}
            passBody={this.passBody}
          />
          <h1>Welcome {this.props.authReducer.user}</h1>
        </div>
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

export default connect(mapStateToProps, { addUserImage, getUserImage })(User);
