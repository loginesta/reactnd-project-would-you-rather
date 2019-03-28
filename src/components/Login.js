import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  handleSetAuthedUser = event => {
    const { dispatch } = this.props;
    dispatch(
      setAuthedUser({
        id: event.target.id,
      }),
    );
  };

  render() {
    const { users } = this.props;

    return (
      <div>
        <h3>Login Page</h3>
        {Object.keys(users).map(id => (
          <li key={id} id={id} onClick={this.handleSetAuthedUser}>
            {users[id].name}
          </li>
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
