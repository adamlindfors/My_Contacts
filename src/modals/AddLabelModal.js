import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { addLabel } from "../actions/contactActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddLabelModal extends Component {
  state = {
    labelName: "",
  };

  addLabel = () => {
    if (this.state.labelName !== "") {
      this.props.addLabel(this.state.labelName, this.props.authReducer.subID);
      this.setState({ labelName: "" });
      this.props.onHide();
    }
  };

  onChangeLabel = (e) => {
    this.setState({
      labelName: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add new label</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <input
                required
                className="form-control"
                value={this.state.labelname}
                onChange={this.onChangeLabel}
              ></input>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.addLabel}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

AddLabelModal.propTypes = {
  contactReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { addLabel })(AddLabelModal);
