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

  render() {
    console.log(this.props.users);
    const { authedUser, users } = this.props;
    const leaderboard = this.getUsersRanking();
    console.log(leaderboard);
    return (
      <div>
        <h1>Leaderboard</h1>
        {leaderboard.map(ranking => (
          <div className="card" key={ranking.userId}>
            <img
              className="avatar"
              src={users[ranking.userId].avatarURL}
              alt=""
            />
            {users[ranking.userId].name}
            <ul>
              <li>
                Questions asked: <strong>{ranking.asked}</strong>
              </li>
              <li>
                Questions answered: <strong>{ranking.answered}</strong>
              </li>
            </ul>
            <div className="ranking-score">{ranking.score}</div>
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
