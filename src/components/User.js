import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImageUploaderWidget from "./ImageUploaderWidget";
import { addUserImage, getUserImage } from "../actions/authActions";

class User extends Component {
  componentDidMount() {
    this.props.getUserImage(this.props.authReducer.subID);
  }
  onImageSuccess = async (res) => {
    await res;
    this.props.addUserImage(res, this.props.authReducer.subID);
  };
  passBody = () => {
    return (
      <img
        alt="100x100"
        src={
          "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_250,h_250/" +
          this.props.authReducer.image
        }
        data-holder-rendered="true"
      />
    );
  };
  render() {
    return (
      <div className="text-center">
        <ImageUploaderWidget
          onImageSuccess={this.onImageSuccess}
          passBody={this.passBody}
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

export default connect(mapStateToProps, { addUserImage, getUserImage })(User);
