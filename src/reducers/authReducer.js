import * as types from '../constants/actionTypes';

const initialState = {
  view: 'login',
  userName: '',
  _id: '',
  token: '',
  loggedIn: false
};

export default function quizReducer(state = initialState, action) {
  switch(action.type) {
    case types.LOG_IN:
      return {
        ...state,
        userName: action.userName,
        user_Id: action.user_Id,
        token: action.token,
        loggedIn: true
      };
    case types.EMAIL_USED:
      return {
        ...state,
        emailUsed: true,
        email: action.email
      };
    case types.LOG_OUT:
      return {
        ...state,
        userName: "",
        user_Id: "",
        token: "",
        loggedIn: false
      };
    default:
    return state;
  }
}
