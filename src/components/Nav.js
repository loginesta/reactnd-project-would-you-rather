import React, { Component } from "react";
import { connect } from "react-redux";
import { unsetAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(unsetAuthedUser());
  };

  render() {
    const { avatarURL, id } = this.props.user;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#defaultNavbar"
          aria-controls="defaultNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="defaultNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                New Question
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Leader Board
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="logged-in-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img className="avatar" src={avatarURL} alt="" /> {id}
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="logged-in-dropdown"
              >
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleLogout}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    user: users[Object.values(authedUser)],
  };
}

export default connect(mapStateToProps)(Nav);
