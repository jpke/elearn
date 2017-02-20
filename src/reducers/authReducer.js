import * as types from '../constants/actionTypes';

let initialState;
if(window.localStorage.userName) {
    initialState = {
      view: 'login',
      userName: window.localStorage.userName,
      userId: window.localStorage.user_Id,
      course: "",
      courses: JSON.parse(window.localStorage.courses),
      passed: [],
      token: window.localStorage.token,
      loggedIn: false,
      loading: false,
      newUser: "",
      enrollable: [],
      enrolled: [],
      message: ""
    }
  } else {
    initialState = {
      view: 'login',
      userName: '',
      userId: '',
      course: "",
      courses: [],
      passed: [],
      token: "",
      loggedIn: false,
      loading: false,
      newUser: "",
      enrollable: [],
      enrolled: [],
      message: ""
    }
  }

export default function authReducer(state = initialState, action) {
  let courses, course, enrollable, index, i, passed;
  switch(action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: !state.loading,
        loadingItem: action.item
      };
    case types.BAD_RESPONSE:
      return {
        ...state,
        errorMessage: action.message
      };
    case types.LOG_IN:
      return {
        ...state,
        userName: action.userName,
        userId: action.user_Id,
        courses: action.courses,
        course: "",
        passed: action.passed,
        token: action.token,
        loggedIn: true,
        url: action.url
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
        userId: "",
        token: "",
        loggedIn: false
      };
    case types.SELECT_COURSE:
      return {
        ...state,
        course: action.course,
        message: ""
      };
    case types.EDIT_COURSE:
      course = JSON.parse(JSON.stringify(state.course));
      if(action.id === "course-title") {
        course.name = action.value;
      }
      return {
        ...state,
        course: course,
        message: ""
      };
    case types.ADD_USER:
      enrollable = JSON.parse(JSON.stringify(state.enrollable));
      enrollable.push(action.user);
      return {
        ...state,
        enrollable: enrollable
      };
    case types.DELETE_USER:
      course = JSON.parse(JSON.stringify(state.course));
      course.enrollable = course.enrollable.slice(0, action.index).concat(course.enrollable.slice(action.index + 1, course.enrollable.length));
      return {
        ...state,
        course: course
      };
    case types.UPDATE_ENROLLABLE:
      return {
        ...state,
        enrollable: action.enrollable,
      };
    case types.UPDATE_ENROLLED:
      return {
        ...state,
        enrolled: action.enrolled
      }
    case types.UPDATE_COURSE:
      if(!action.course) return state;
      courses = JSON.parse(JSON.stringify(state.courses));
      index = 0;
      i = 0
      for(i; i < courses.length; i++) {
        if(courses[i]._id === action.course._id) index = i;
      }
      courses = courses.slice(0, index).concat(action.course, courses.slice(index + 1, courses.length));
      return {
        ...state,
        course: action.course,
        courses: courses,
        message: "Course saved!"
      };
    case types.SUBMIT_QUIZ:
      if(action.passed) {
        passed = JSON.parse(JSON.stringify(state.passed)).concat({_id: action.attempt._id, of: action.attempt.of});
      } else {
        passed = state.passed;
      }
      return {
        ...state,
        passed: passed
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
      if(!action.course) return state;
      courses = JSON.parse(JSON.stringify(state.courses));
      index = 0;
      i = 0
      for(i; i < courses.length; i++) {
        if(courses[i]._id === action.course._id) index = i;
      }
      courses = courses.slice(0, index).concat(action.course, courses.slice(index + 1, courses.length));
      return {
        ...state,
        courses: courses,
        course: courses[index]
      };
    default:
    return state;
  }
}
