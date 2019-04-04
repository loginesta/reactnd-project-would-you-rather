import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
  render() {
    const { question, users } = this.props;
    return (
      <div className="question">
        <div className="question-author">
          {users[question.author].name} asks...
        </div>
        <div className="question-body">
          <div className="question-author-avatar">
            <img src={users[question.author].avatarURL} width="60" alt="" />
          </div>
          <div className="question-options">
            <p>Would you rather:</p>
            <ul>
              <li>{question.optionOne.text}</li>
              <li>{question.optionTwo.text}</li>
            </ul>
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
