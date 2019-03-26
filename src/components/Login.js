import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    return (
      <div>
        <h3>Login Page</h3>
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
