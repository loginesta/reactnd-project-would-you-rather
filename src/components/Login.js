import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    return (
      <div>
        <h3>Login Page</h3>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        ;
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: users,
  };
}

export default connect(mapStateToProps)(Login);
