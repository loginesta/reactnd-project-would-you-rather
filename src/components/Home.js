import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { avatarURL, id } = this.props.user;
    console.log(this.props);
    return (
      <div>
        <h3>Hello {id}</h3>
        <img src={avatarURL} alt="" />
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
