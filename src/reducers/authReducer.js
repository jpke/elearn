import * as types from '../constants/actionTypes';

const initialState = {
  view: 'login',
  userName: '',
  _id: '',
  token: window.localStorage.getItem('token'),
  loggedIn: false,
  loading: false
};

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: !state.loading,
        loadingItem: action.item
      }
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
