import React, { Component } from "react";
import { connect } from "react-redux";

class ViewQuestion extends Component {
  render() {
    const { authedUser, questions, users } = this.props;
    const questionId = this.props.match.params.question_id;
    const thisQuestion = Object.values(questions).filter(
      q => q.id === questionId,
    );
    const question = thisQuestion.shift();
    console.log(question);
    return (
      <div className="card">
        <div className="question">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col-auto mr-auto">
                <img
                  className="avatar"
                  src={users[question.author].avatarURL}
                  width="60"
                  alt=""
                />
                {users[question.author].name} asks...
              </div>
            </div>
          </div>
          <div className="question-body">
            <div className="question-options">
              <div className="col-sm">
                <p>
                  <strong>Would you rather:</strong>
                </p>
                <ul>
                  <li>{question.optionOne.text}</li>
                  <li>{question.optionTwo.text}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(ViewQuestion);
