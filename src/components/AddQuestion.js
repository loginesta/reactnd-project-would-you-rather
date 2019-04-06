import React, { Component } from "react";
import { connect } from "react-redux";

class AddQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };

  handleAddQuestion = e => {
    e.preventDefault();
    console.log(33);
  };

  handleInputChange = (e, option) => {
    const text = e.target.value;
    if (text !== "") {
      this.setState(function(previousState) {
        return option === 1
          ? { ...previousState, optionOne: text }
          : { ...previousState, optionTwo: text };
      });
    }
  };

  handleChange = function(event, optionIndex) {
    const text = event.target.value;

    this.setState(function(previousState) {
      return optionIndex === 1
        ? { ...previousState, optionOne: text }
        : { ...previousState, optionTwo: text };
    });
  };

  render() {
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
                  value={this.state.optionOne}
                  onChange={event => this.handleInputChange(event, 1)}
                />
              </div>
              <div className="col-sm-6">
                <textarea
                  placeholder="Optio Two"
                  type="textarea"
                  name="optionTwo"
                  value={this.state.optionTwo}
                  onChange={event => this.handleInputChange(event, 2)}
                />
              </div>
            </div>
          </div>
          <div className="card-footer text-right align-items-center">
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={this.handleAddQuestion}
              disabled={
                this.state.optionOne === "" || this.state.optionTwo === ""
              }
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
