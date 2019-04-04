import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionList extends Component {
  state = {
    showAnswered: false,
  };

  sortQuestions = questions => {
    const questionsArray = Object.keys(questions).map(qid => questions[qid]);
    return questionsArray.sort((a, b) => b.timestamp - a.timestamp);
  };

  filterQuestions = () => {
    const sortedQuestions = this.sortQuestions(this.props.questions);
    const { authedUser } = this.props;
    let questions = [];

    if (this.state.showAnswered) {
      questions = sortedQuestions.filter(function(question) {
        return (
          question.optionOne.votes.includes(authedUser.id) ||
          question.optionTwo.votes.includes(authedUser.id)
        );
      });
    } else {
      questions = sortedQuestions.filter(function(question) {
        return (
          question.optionOne.votes.indexOf(authedUser.id) === -1 &&
          question.optionTwo.votes.indexOf(authedUser.id) === -1
        );
      });
    }
    return questions;
  };

  handleToggleFilter = answered => {
    this.setState(function() {
      return {
        showAnswered: answered,
      };
    });
  };

  render() {
    const filteredQuestions = this.filterQuestions();

    return (
      <div className="main-container">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={
              this.state.showAnswered
                ? "btn btn-outline-secondary"
                : "btn btn-outline-secondary active"
            }
            onClick={e => this.handleToggleFilter(false)}
          >
            Unanswered
          </button>
          <button
            type="button"
            className={
              this.state.showAnswered
                ? "btn btn-outline-secondary active"
                : "btn btn-outline-secondary"
            }
            onClick={e => this.handleToggleFilter(true)}
          >
            Answered
          </button>
        </div>

        {Object.keys(filteredQuestions).map(qid => (
          <div className="card" key={qid} id={qid}>
            <Question question={filteredQuestions[qid]} />
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionList);
