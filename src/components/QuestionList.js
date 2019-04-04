import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionList extends Component {
  state = {
    showingAnswered: true,
  };

  sortQuestions = questions => {
    const questionsArray = Object.keys(questions).map(qid => questions[qid]);
    return questionsArray.sort((a, b) => b.timestamp - a.timestamp);
  };

  filterQuestions = () => {
    const sortedQuestions = this.sortQuestions(this.props.questions);
    const { authedUser } = this.props;
    let questions = [];

    if (this.state.showingAnswered) {
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

  render() {
    const filteredQuestions = this.filterQuestions();

    return (
      <div className="distance-from-navbar">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={
              this.state.showingAnswered
                ? "btn btn-outline-secondary active"
                : "btn btn-outline-secondary"
            }
          >
            Answered
          </button>
          <button
            type="button"
            className={
              this.state.showingAnswered
                ? "btn btn-outline-secondary"
                : "btn btn-outline-secondary active"
            }
          >
            Unanswered
          </button>
        </div>
        <ul>
          {Object.keys(filteredQuestions).map(qid => (
            <li key={qid} id={qid}>
              <Question question={filteredQuestions[qid]} />
            </li>
          ))}
        </ul>
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
