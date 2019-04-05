import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";

import AddQuestion from "./AddQuestion";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Nav from "./Nav";
import NotFound from "./NotFound";
import ViewQuestion from "./ViewQuestion";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {!loggedIn && <Login />}
            {loggedIn && (
              <div className="main-container">
                <Nav />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/add" exact component={AddQuestion} />
                  <Route
                    path="/questions/:question_id"
                    component={ViewQuestion}
                  />
                  <Route path="/leaderboard" exact component={Leaderboard} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
