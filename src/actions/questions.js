import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const question = { optionOneText, optionTwoText, author: authedUser };

    dispatch(showLoading());

    return saveQuestion(question)
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleQuestionAnswer(info) {
  return dispatch => {
    dispatch(answerQuestion(info));

    return saveQuestionAnswer(info).catch(e => {
      console.warn("Error in handleQuestionAnswer: ", e);
      dispatch(answerQuestion(info));
      alert("There was an error answering the question. Try again.");
    });
  };
}
