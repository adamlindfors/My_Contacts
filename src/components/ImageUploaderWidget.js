import React, { Component } from "react";

class ImageUploaderWidget extends Component {
  state = {
    myWidget: window.cloudinary.createUploadWidget(
      {
        cloudName: "mycontacts",
        uploadPreset: "upload",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          this.props.onImageSuccess(result.info.url);
        }
      }
    ),
  };

  onClick = (e) => {
    e.preventDefault();
    this.state.myWidget.open();
  };

  render() {
    return (
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={this.onClick}
      >
        Upload Image
      </button>
    );
  }
}

export default ImageUploaderWidget;
