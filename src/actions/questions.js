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
    const question = { optionOneText, optionTwoText, author: authedUser.id };

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

export function handleQuestionAnswer(question, answer) {
  return function(dispatch, getState) {
    const { authedUser } = getState();

    const answerInfo = {
      authedUser: authedUser.id,
      qid: question.id,
      answer,
    };
    dispatch(showLoading());

    return saveQuestionAnswer(answerInfo)
      .then(() => dispatch(answerQuestion(answerInfo)))
      .then(() => dispatch(hideLoading()));
  };
}
