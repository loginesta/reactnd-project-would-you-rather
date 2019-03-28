import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div>
        <h3>Hello {this.props.authedUserId}</h3>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUserId: Object.values(authedUser),
  };
}

export default connect(mapStateToProps)(Home);
