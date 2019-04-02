import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionList extends Component {
  render() {
    const { questions } = this.props;
    const questionsArray = Object.keys(questions).map(qid => questions[qid]);
    const sortedQuestions = questionsArray.sort(
      (a, b) => b.timestamp - a.timestamp,
    );

    console.log(sortedQuestions);

    return (
      <ul>
        {Object.keys(sortedQuestions).map(qid => (
          <li key={qid} id={qid}>
            <Question question={sortedQuestions[qid]} />
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questions,
  };
}

export default connect(mapStateToProps)(QuestionList);
