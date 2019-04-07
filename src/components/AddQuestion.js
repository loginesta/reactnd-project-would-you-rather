import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";

class AddQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };

  handleAddQuestion = e => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo)).then(() =>
      this.props.history.push("/"),
    );
  };

  handleInputChange = e => {
    const text = e.target.value;
    const option = e.target.name;

    this.setState(previousState => ({
      ...previousState,
      [option]: text,
    }));
  };

  render() {
    const { optionOne, optionTwo } = this.state;

    return (
      <div className="card">
        <div className="question">
          <div className="card-header">Would You Rather</div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <textarea
                  placeholder="Optio One"
                  type="textarea"
                  name="optionOne"
                  value={optionOne}
                  onChange={event => this.handleInputChange(event)}
                />
              </div>
              <div className="col-sm-6">
                <textarea
                  placeholder="Optio Two"
                  type="textarea"
                  name="optionTwo"
                  value={optionTwo}
                  onChange={event => this.handleInputChange(event)}
                />
              </div>
            </div>
          </div>
          <div className="card-footer text-right align-items-center">
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={this.handleAddQuestion}
              disabled={optionOne === "" || optionTwo === ""}
            >
              Submit
            </button>
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

export default connect(mapStateToProps)(AddQuestion);
