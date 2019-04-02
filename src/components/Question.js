import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
  render() {
    const { question, users } = this.props;
    return (
      <div className="question">
        <div className="question-author">{question.author}</div>
        <div className="question-body">
          <div className="question-author-avatar">
            <img src={users[question.author].avatarURL} width="60" />
          </div>
          <div className="questions-options">
            {question.optionOne.text}
            {question.optionTwo.text}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Question);
