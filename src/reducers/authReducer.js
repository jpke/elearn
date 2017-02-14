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
  let courses, index, i;
  switch(action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: !state.loading,
        loadingItem: action.item
      };
    case types.BAD_RESPONSE:
      return {
        errorMessage: action.message
      };
    case types.LOG_IN:
      return {
        ...state,
        userName: action.userName,
        user_Id: action.user_Id,
        courses: action.courses,
        course: "",
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
    case types.DELETE_QUIZ:
      index = -1;
      i = 0;
      for(i; i < action.courses.length; i++) {
        if(action.courses[i]._id === action.courseID) index = i;
      }
      return {
        ...state,
        course: action.courses[index],
        courses: action.courses
      };
    case types.SAVE_QUIZ:
      console.log("course: ", action.course);
      console.log("courses: ", state.courses);
      if(!action.course) return state;
      courses = JSON.parse(JSON.stringify(state.courses));
      index = -1;
      i = 0
      for(i; i < courses.length; i++) {
        if(courses[i]._id === action.course._id) index = i;
      }
      courses = courses.slice(0, index).concat(action.course, courses.slice(index + 1, courses.length));
      console.log("updated courses: ", courses);
      return {
        ...state,
        courses: courses,
        course: courses[index]
      };
    default:
    return state;
  }
}
