import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  handleSetAuthedUser = event => {
    if (event.target.value !== "") {
      const { dispatch } = this.props;
      dispatch(
        setAuthedUser({
          id: event.target.value,
        }),
      );
    }
  };

  render() {
    const { users } = this.props;

    return (
      <div className="login-wrapper">
        <form className="login-form">
          <h1 className="h3 mb-3 font-weight-normal">Login Page</h1>
          <label className="sr-only">User</label>
          <select
            id="userName"
            className="form-control"
            onChange={this.handleSetAuthedUser}
          >
            <option value="" defaultValue>
              Please select a user
            </option>
            {Object.keys(users).map(id => (
              <option key={id} value={id}>
                {users[id].name}
              </option>
            ))}
          </select>
        </form>
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
