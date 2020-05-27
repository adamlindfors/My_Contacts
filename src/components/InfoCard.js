import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class InfoCard extends Component {
  render() {
    return (
      <div>
        <div style={{ padding: "1vh" }}>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="text-center">
                  <h2>
                    <FontAwesomeIcon icon={this.props.icon}></FontAwesomeIcon>
                    {"  " + this.props.title}
                  </h2>
                </div>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <input
                type="text-form"
                className="form-control text-center"
                defaultValue={this.props.info}
                onChange={this.props.onChange}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
