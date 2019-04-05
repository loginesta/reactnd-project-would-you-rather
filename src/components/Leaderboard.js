import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  getUserRank = userId => {
    const { questions } = this.props;
    const questionsArray = Object.values(questions);
    let answered = 0,
      asked = 0;

    for (let i = 0; i < questionsArray.length; i++) {
      if (
        questionsArray[i].optionOne.votes.includes(userId) ||
        questionsArray[i].optionTwo.votes.includes(userId)
      ) {
        answered++;
      }
      if (questionsArray[i].author === userId) {
        asked++;
      }
    }
    return { answered, asked };
  };

  getUsersRanking = () => {
    const { users } = this.props;
    const usersRanking = Object.values(users).map(user => {
      const { answered, asked } = this.getUserRank(user.id);
      const ranking = {};
      ranking.userId = user.id;
      ranking.answered = answered;
      ranking.asked = asked;
      ranking.score = answered + asked;

      return ranking;
    });

    return this.sortUsersRanking(usersRanking);
  };

  sortUsersRanking = usersRanking => {
    return usersRanking.sort((a, b) => b.score - a.score);
  };

  attachBadge = () => {
    return (
      <span className="badge badge-warning highlight highlight-left">
        That's you
      </span>
    );
  };

  render() {
    const { authedUser, users } = this.props;
    const leaderboard = this.getUsersRanking();

    return (
      <div>
        <h1>Leaderboard</h1>
        {leaderboard.map(ranking => (
          <div
            className={
              ranking.userId === authedUser.id
                ? "card text-white bg-dark"
                : "card"
            }
            key={ranking.userId}
          >
            {ranking.userId === authedUser.id && this.attachBadge()}
            <div className="row">
              <div className="col-sm-4">
                <img
                  className="avatar avatar-lg"
                  src={users[ranking.userId].avatarURL}
                  alt=""
                />
              </div>
              <div className="col-sm-5">
                <div className="ranking-wrapper">
                  <h2>{users[ranking.userId].name}</h2>
                  <h6>
                    Questions asked: <strong>{ranking.asked}</strong>
                  </h6>
                  <h6>
                    Questions answered: <strong>{ranking.answered}</strong>
                  </h6>
                </div>
              </div>
              <div className="col-sm-3 align-middle text-center">
                <div className="ranking-wrapper">
                  <h3>Score</h3>
                  <h2>
                    <span className="badge badge-primary">{ranking.score}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default connect(mapStateToProps)(Leaderboard);
