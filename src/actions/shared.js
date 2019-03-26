import { getInitialData } from "../utils/api";
import { receiveUsers } from "../actions/users";
/*import { receiveTweets } from "../actions/questions";*/
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

//const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users }) => {
      dispatch(receiveUsers(users));
      //dispatch(receiveQuestions(questions));
      //dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
