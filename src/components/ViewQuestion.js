import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route } from "react-router-dom";
import NotFound from "./NotFound";

class ViewQuestion extends Component {
  getQuestionById = () => {
    const questionId = this.props.match.params.question_id;
    const { questions } = this.props;
    const thisQuestion = Object.values(questions).filter(
      q => q.id === questionId,
    );
    return thisQuestion.shift();
  };

  isAnsweredByUser = (question, authedUserId) => {
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

    const optionChosenByUser = this.getOptionChosenByUser(
      question,
      authedUserId,
    );

    return (
      <div className="row align-items-center">
        <div
          className={
            optionChosenByUser === "one"
              ? "col-sm alert alert-warning"
              : "col-sm alert alert-light"
          }
        >
          {optionChosenByUser === "one" && this.attachBadge()}
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
            optionChosenByUser === "two"
              ? "col-sm alert alert-warning"
              : "col-sm alert alert-light"
          }
        >
          {optionChosenByUser === "two" && this.attachBadge()}
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

  getOptionChosenByUser = (question, authedUserId) => {
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
          <button className="btn btn-lg btn-outline-primary btn-block">
            {question.optionOne.text}
          </button>
        </div>
        <div className="col-sm text-center">
          <button className="btn btn-lg btn-outline-secondary btn-block">
            {question.optionTwo.text}
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { authedUser, users } = this.props;
    const question = this.getQuestionById();

    if (question === undefined) {
      return <Route component={NotFound} />;
    }

    const isAnsweredByUser = this.isAnsweredByUser(question, authedUser.id);

    return (
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
                {!isAnsweredByUser && this.showOptions(question)}
                {isAnsweredByUser && this.showResults(question, authedUser.id)}
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
