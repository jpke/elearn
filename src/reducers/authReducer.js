import * as types from '../constants/actionTypes';

const initialState = {
};

export default function quizReducer(state = initialState, action) {
  switch(action.type) {
    case types.LOG_IN:
      return {
        ...state,
        userName: action.userName,
        user_Id: action.user_Id,
        token: action.token
      };
      case types.LOG_OUT:
        return {
          ...state,
          userName: "",
          user_Id: "",
          token: ""
        };
    default:
    return state;
  }
}
