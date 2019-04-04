import React, { Component } from "react";
import { connect } from "react-redux";
import authedUser from "../reducers/authedUser";

class ViewQuestion extends Component {
  getQuestionById = () => {
    const questionId = this.props.match.params.question_id;
    const { questions } = this.props;
    const thisQuestion = Object.values(questions).filter(
      q => q.id === questionId,
    );
    return thisQuestion.shift();
  };

  userAlreadyAnsweredThisQuestion = (authedUserId, question) => {
    return (
      question.optionOne.votes.includes(authedUserId) ||
      question.optionTwo.votes.includes(authedUserId)
    );
  };

  showResults = (question, authedUserId) => {
    console.log(question.optionOne);
    console.log(question.optionTwo);

    const votesOptionOne = question.optionOne.votes.length,
      votesOptionTwo = question.optionTwo.votes.length,
      votesTotal = votesOptionOne + votesOptionTwo,
      percentageOptionOne = (votesOptionOne / votesTotal) * 100,
      percentageOptionTwo = (votesOptionTwo / votesTotal) * 100;

    const optionChosenByUser = this.getOptionChosenByUser(
      question,
      authedUserId,
    );

    console.log(percentageOptionOne, percentageOptionTwo);
    console.log(optionChosenByUser);

    return (
      <div className="row">
        <button className="">{question.optionOne.text}</button>
        <button className="">{question.optionTwo.text}</button>
      </div>
    );
  };

  getOptionChosenByUser = (question, authedUserId) => {
    if (question.optionOne.votes.includes(authedUserId)) {
      return "one";
    } else return "two";
  };

  showOptions = question => {
    return (
      <div className="row">
        <button>{question.optionOne.text}</button>
        <button>{question.optionTwo.text}</button>
      </div>
    );
  };

  render() {
    const { authedUser, users } = this.props;
    const question = this.getQuestionById();
    const userAlreadyAnsweredThisQuestion = this.userAlreadyAnsweredThisQuestion(
      authedUser.id,
      question,
    );

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
                {!userAlreadyAnsweredThisQuestion && this.showOptions(question)}
                {userAlreadyAnsweredThisQuestion &&
                  this.showResults(question, authedUser.id)}
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
