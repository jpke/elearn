import * as types from '../constants/actionTypes';

let initialState;
if(window.localStorage.userName) {
    initialState = {
      view: 'login',
      userName: window.localStorage.userName,
      _id: window.localStorage.user_Id,
      course: "",
      courses: JSON.parse(window.localStorage.courses),
      token: window.localStorage.token,
      loggedIn: false,
      loading: false
    }
  } else {
    initialState = {
      view: 'login',
      userName: '',
      _id: '',
      course: "",
      courses: [],
      token: "",
      loggedIn: false,
      loading: false
    }
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
        courses: action.courses,
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
    case types.SELECT_COURSE:
      return {
        ...state,
        course: action.course
      };
    default:
    return state;
  }
}
