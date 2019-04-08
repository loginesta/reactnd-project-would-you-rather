import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Question = props => {
  const { question, users } = props;
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
            <div className="col-auto">
              <Link
                to={`/questions/${question.id}`}
                className="btn btn-outline-primary"
              >
                View poll
              </Link>
            </div>
          </div>
        </div>
        <div className="question-body">
          <div className="question-options">
            <div className="col-sm">
              <p>
                <strong>Would you rather:</strong>
              </p>
              <ul>
                <li>{question.optionOne.text}</li>
                <li>{question.optionTwo.text}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Question);
