/* eslint-disable no-unused-vars */

import * as types from '../constants/actionTypes';

//initialize authReducer state
const initialState = {
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
  };

export {initialState};

//define authReducer
export default function authReducer(state = initialState, action) {
  //declare variables used in reducer
  let courses, course, enrollable, index, i, passed;

  //switch block to define behavior for each case
  switch(action.type) {

    //sets loading status, will eventually use for loading icon
    case types.LOADING:
      return {
        ...state,
        loading: !state.loading,
        loadingItem: action.item
      };

    //sets errorMessage status, which prompts user alert
    case types.BAD_RESPONSE:
      return {
        ...state,
        errorMessage: action.message
      };

    //sets user info upon successful login
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

    //resets user information to log user out of client side
    case types.LOG_OUT:
      return {
        ...state,
        userName: "",
        userId: "",
        token: "",
        loggedIn: false
      };

    //updates state with course selected by user
    case types.SELECT_COURSE:
      return {
        ...state,
        course: action.course,
        message: ""
      };

    //updates selected course title in state
    //this will allow updated course title to be sent in updateCourse fetch request
    case types.EDIT_COURSE:
      //immutable course deep copy
      course = JSON.parse(JSON.stringify(state.course));
      if(action.id === "course-title") {
        course.name = action.value;
      }
      return {
        ...state,
        course: course,
        message: ""
      };

    //updates list of unregistered user emails that are enrollable in course
    //called upon success of getEnrollable, addUser or deleteUser fetch requests
    case types.UPDATE_ENROLLABLE:
      return {
        ...state,
        enrollable: action.enrollable,
      };

    //updates list of registered users currently enrolled in course
    //called upon success of getEnrollable fetch request
    case types.UPDATE_ENROLLED:
      return {
        ...state,
        enrolled: action.enrolled
      }

    //updates course list and selected course with updated course content
    //called upon success of updateCourse fetch request
    case types.UPDATE_COURSE:
      if(!action.course) return state;
      //immutable course deep copy
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

    //updates array of user submissions of selected quiz that passed the minimum score requirement of the quiz
    //only updates array if new submission passed minimum score requirement
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

    //deletes quiz from course quiz list clientside
    //called upon success of deleteSavedQuiz fetch request, which deletes quiz and updates course quiz list serverside
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

    //saves quiz in course quiz list clientside
    //called upon success of saveQuiz fetch request, which saves quiz and updates course quiz list serverside
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
