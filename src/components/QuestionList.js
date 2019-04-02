import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionList extends Component {
  render() {
    const { questions } = this.props;
    return (
      <ul>
        {Object.keys(questions).map(qid => (
          <li key={qid} id={qid}>
            <Question question={questions[qid]} />
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
