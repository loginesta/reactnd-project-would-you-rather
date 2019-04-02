import React, { Component } from "react";
import { connect } from "react-redux";
import { unsetAuthedUser } from "../actions/authedUser";
import QuestionList from "./QuestionList";

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(unsetAuthedUser());
  };

  render() {
    const { avatarURL, id } = this.props.user;
    return (
      <div>
        <h3>Hello {id}</h3>
        <img src={avatarURL} alt="" />
        <p onClick={this.handleLogout}>Logout</p>
        <QuestionList />
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    user: users[Object.values(authedUser)],
  };
}

export default connect(mapStateToProps)(Home);
