import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { unsetAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(unsetAuthedUser());
  };

  render() {
    const { avatarURL, name } = this.props.user;
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
          <div className="col-auto mr-auto">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/" exact className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/add" className="nav-link">
                  New Question
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className="nav-link">
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-auto">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle fake-button"
                  id="logged-in-dropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img className="avatar" src={avatarURL} alt="" /> {name}
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="logged-in-dropdown"
                >
                  <Link
                    to="/logout"
                    className="dropdown-item"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
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
