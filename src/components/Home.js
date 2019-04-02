import React, { Component } from "react";
import { connect } from "react-redux";
import { unsetAuthedUser } from "../actions/authedUser";

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(unsetAuthedUser());
  };

  render() {
    const { avatarURL, id } = this.props.user;
    const { questions } = this.props;
    console.log(this.props);
    return (
      <div>
        <h3>Hello {id}</h3>
        <img src={avatarURL} alt="" />
        <p onClick={this.handleLogout}>Logout</p>
        {Object.keys(questions).map(qid => (
          <li key={qid} id={qid}>
            {questions[qid].author}
            {questions[qid].optionOne.text}
            {questions[qid].optionTwo.text}
            {questions[qid].timestamp}
          </li>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    user: users[Object.values(authedUser)],
    questions,
  };
}

export default connect(mapStateToProps)(Home);
