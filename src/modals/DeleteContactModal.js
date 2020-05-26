import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteLabel } from "../actions/contactActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DeleteLabelModal extends Component {
  state = {
    label: "",
  };

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  componentDidMount() {
    if (this.props.labelReducer.labels[0]) {
      this.setState({ label: this.props.labelReducer.labels[0] });
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>
                Do you want to delete {this.props.name} from your contacts?
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                this.props.onDelete();
                window.location = "/";
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DeleteLabelModal.propTypes = {
  contactReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
  labelReducer: state.labelReducer,
});

export default connect(mapStateToProps, { deleteLabel })(DeleteLabelModal);
