import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionList extends Component {
  render() {
    const { questions, user, users } = this.props;
    return (
      <ul>
        {Object.keys(questions).map(qid => (
          <li key={qid} id={qid}>
            <div className="question">
              <div className="question-author">{questions[qid].author}</div>
              <div className="question-body">
                <div className="question-author-avatar">
                  <img
                    src={users[questions[qid].author].avatarURL}
                    width="60"
                  />
                </div>
                <div className="questions-options">
                  {questions[qid].optionOne.text}
                  {questions[qid].optionTwo.text}
                </div>
              </div>
            </div>
            {questions[qid].timestamp}
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
