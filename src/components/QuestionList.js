import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionList extends Component {
  render() {
    const { questions, user, users } = this.props;
    return (
      <ul>
        {Object.keys(questions).map(qid => (
          <li key={qid} id={qid}>
            <Question question={questions[qid]} />
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    user: users[Object.values(authedUser)],
    users,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionList);
