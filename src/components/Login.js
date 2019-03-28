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
    return (
      <div>
        <h3>Login Page</h3>
        {Object.values(this.props.users).map(user => (
          <li key={user.id} id={user.id} onClick={this.handleSetAuthedUser}>
            <img src={user.avatar} alt="" />
            {user.name}
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
