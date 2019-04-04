import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionList extends Component {
  sortQuestions = questions => {
    const questionsArray = Object.keys(questions).map(qid => questions[qid]);
    return questionsArray.sort((a, b) => b.timestamp - a.timestamp);
  };

  render() {
    const sortedQuestions = this.sortQuestions(this.props.questions);

    return (
      <div className="distance-from-navbar">
        <ul>
          {Object.keys(sortedQuestions).map(qid => (
            <li key={qid} id={qid}>
              <Question question={sortedQuestions[qid]} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questions,
  };
}

export default connect(mapStateToProps)(QuestionList);
