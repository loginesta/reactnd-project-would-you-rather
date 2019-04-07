import React, { Component } from "react";
import { connect } from "react-redux";
import { handleQuestionAnswer } from "../actions/questions";
import NotFound from "./NotFound";

class ViewQuestion extends Component {
  getQuestion = () => {
    const questionId = this.props.match.params.question_id;
    const { questions } = this.props;
    const question = Object.values(questions)
      .filter(q => q.id === questionId)
      .shift();
    return question;
  };

  isAnswered = (question, authedUserId) => {
    return (
      question.optionOne.votes.includes(authedUserId) ||
      question.optionTwo.votes.includes(authedUserId)
    );
  };

  showResults = (question, authedUserId) => {
    const votesOptionOne = question.optionOne.votes.length,
      votesOptionTwo = question.optionTwo.votes.length,
      votesTotal = votesOptionOne + votesOptionTwo,
      percentageOptionOne = (votesOptionOne / votesTotal).toFixed(2) * 100,
      percentageOptionTwo = (votesOptionTwo / votesTotal).toFixed(2) * 100;

    const userAnswer = this.getUserAnswer(question, authedUserId);

    return (
      <div className="row align-items-center">
        <div
          className={
            userAnswer === "one"
              ? "col-sm alert alert-warning"
              : "col-sm alert alert-light"
          }
        >
          {userAnswer === "one" && this.attachBadge()}
          <button className="btn btn-primary btn-lg btn-block">
            {question.optionOne.text}
            <span className="badge badge-light">{percentageOptionOne}%</span>
          </button>
          <p className="text-center">
            <strong>
              ({votesOptionOne} out of {votesTotal} votes)
            </strong>
          </p>
        </div>
        <div
          className={
            userAnswer === "two"
              ? "col-sm alert alert-warning"
              : "col-sm alert alert-light"
          }
        >
          {userAnswer === "two" && this.attachBadge()}
          <button className="btn btn-secondary btn-lg btn-block">
            {question.optionTwo.text}
            <span className="badge badge-light">{percentageOptionTwo}%</span>
          </button>
          <p className="text-center">
            <strong>
              ({votesOptionTwo} out of {votesTotal} votes)
            </strong>
          </p>
        </div>
      </div>
    );
  };

  getUserAnswer = (question, authedUserId) => {
    if (question.optionOne.votes.includes(authedUserId)) {
      return "one";
    } else return "two";
  };

  attachBadge = () => {
    return <span className="badge badge-warning highlight">Your choice</span>;
  };

  showOptions = question => {
    return (
      <div className="row align-items-center">
        <div className="col-sm text-center">
          <button
            className="btn btn-lg btn-outline-primary btn-block"
            onClick={e => this.handleClickAnswer(question, "optionOne")}
          >
            {question.optionOne.text}
          </button>
        </div>
        <div className="col-sm text-center">
          <button
            className="btn btn-lg btn-outline-secondary btn-block"
            onClick={e => this.handleClickAnswer(question, "optionTwo")}
          >
            {question.optionTwo.text}
          </button>
        </div>
      </div>
    );
  };

  handleClickAnswer = (question, answer) => {
    const { dispatch } = this.props;
    dispatch(handleQuestionAnswer(question, answer));
  };

  render() {
    const { authedUser, users } = this.props;
    const question = this.getQuestion();

    return (
      <div>
        {question === undefined && <NotFound />}
        {question !== undefined && (
          <div className="card">
            <div className="question">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-auto mr-auto">
                    <img
                      className="avatar"
                      src={users[question.author].avatarURL}
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
                    {!this.isAnswered(question, authedUser.id) &&
                      this.showOptions(question)}
                    {this.isAnswered(question, authedUser.id) &&
                      this.showResults(question, authedUser.id)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
