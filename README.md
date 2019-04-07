# Would You Rather Project

_Would You Rather_ is a web application that lets a user play the “Would You Rather?” game. The game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is against the rules.

_In this application, users will be able to answer questions, see which questions they haven’t answered, see how other people have voted, post questions, and see the ranking of users on the leaderboard._

In this application, users will be able to see all the questions posted, which will be presented separatedly. On the one hand, _there will be the questions the user already answered_ and, on the other hand, _the ones the user haven't answered_.

![Screenshot](https://loginesta.github.io/portfolio/projects/myreads-react-app/images/main-page.png)

For each question the user will have access to the question details. If the question has not been answered by the user, the two options will be displayed in order to vote for one of them. Once the question is answered, the user will also be able to see the number of people and the percentage of people who voted for both options.

![Screenshot](https://loginesta.github.io/portfolio/projects/myreads-react-app/images/main-page.png)

A part from that, _the user will be able to create new questions_, always providing two different options. The new questions will be listed in the home page with the rest of unanswered questions.

![Screenshot](https://loginesta.github.io/portfolio/projects/myreads-react-app/images/search-page.png)

Finally, _the user will be able to see the ranking of users on the leaderboard_. All the existing users are listed there according to their score, which is based on the sum of the number of questions answered and the number of questions asked.

![Screenshot](https://loginesta.github.io/portfolio/projects/myreads-react-app/images/search-page.png)

As a requirement, **users will need to log in** to access to the different pages of this application. In this sense, a way to impersonate an existing user is provided with the application.

## Installation

To get started right away:

- install all project dependencies with `npm install`
- start the server with `npm start`

## Dependencies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
And implemented using [React](https://reactjs.org/).

## Important

In order to perform searches, the backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Acknowledgements

This is a project for Udacity's React Fundamentals course. In this sense, Udacity provided a started code (https://github.com/udacity/reactnd-project-would-you-rather-starter) that consisted of a `\_DATA.js` file, which represents a fake database and contains methods that let the developers access the data. The README file of this project outlines how the data is stored and details the methods to access the database.
