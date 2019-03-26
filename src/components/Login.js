import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    return (
      <div>
        <h3>Login Page</h3>
        {Object.keys(this.props.users).map(user => (
          <li key={user}>{user}</li>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
