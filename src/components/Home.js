import React, { Component } from "react";
import QuestionList from "./QuestionList";
import Nav from "./Nav";

class Home extends Component {
  render() {
    return (
      <div>
        <Nav />
        <QuestionList />
      </div>
    );
  }
}

export default Home;
