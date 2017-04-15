import cookie from 'react-cookie'
import * as types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';
// import {browserHistory} from 'react-router';

//toggle dev and production url
// const url = "http://localhost:8080/elearn/";
const url = "https://portfolio-express.herokuapp.com/elearn/"

//dispatches loading message to reducer
export function loading(item) {
  return {
    type: 'LOADING',
    item
  };
}

//dispatches errorMessage to reducer
export function badResponse(message) {
  return {
    type: 'BAD_RESPONSE',
    message
  };
}

//dispatches user info to reducer; called upon successful registration or login
function loggedIn(response) {
  cookie.save("token", response.token)
  return {
    type: types.LOG_IN,
    userName: response.name,
    user_Id: response._id,
    courses: response.courses,
    passed: response.passed,
    token: response.token,
    url: url
  };
}

//sends async request to register new user
//calls loggedIn upon success
//calls badReponse upon failure
export function register(userName, email, password) {
  return function (dispatch) {
    dispatch(loading('register'));
    try {
      fetch(url.concat('users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password
        })
      })
      .then(response => {
        if(response.status !=201) throw response;
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        dispatch(loggedIn(response));
      })
    } catch(error) {
      if(error.status === 400) {
        //provides more specific error message
        return dispatch(badResponse("Email already in use"));
      }
      console.log("error response: ", error);
      dispatch(badResponse("Problem with registration"))
    }
  };
}

//dispatches updated course data to reducer
export function editCourse(id, value) {
  return {
    type: types.EDIT_COURSE,
    id,
    value
  };
}

//sends async request to add unregistered user email to enrollable list for course
//must be course admin for request to succeed
//dispatches updated enrollable list to reducer upon success
//calls badResponse upon failure
export function addUser(token, course_id, email, admin) {
  return function (dispatch) {
    dispatch(loading('update Course'));

      fetch(url.concat('course/enrollable'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email,
          course_id: course_id,
          admin: admin
        })
      })
      .then(response => {
        if(response.status != 201) {
          throw response;
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        dispatch({
          type: types.UPDATE_ENROLLABLE,
          enrollable: response.enrollable
        });
      })
      .catch((response) => {
        dispatch(loading(''));
        console.log("error response: ", response);
        dispatch(badResponse("Problem with adding user"))
    })
  };
}

//sends async request to delete unregistered user email from enrollable list for course
//must be course admin for request to succeed
//dispatches updated enrollable list to reducer upon success
//calls badResponse upon failure
export function deleteUser(token, course_id, email) {
  return function (dispatch) {
    dispatch(loading('update Course'));

      fetch(url.concat('course/enrollable'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          course_id: course_id
        })
      })
      .then(response => {
        if(response.status != 200) {
          throw response;
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        dispatch({
          type: types.UPDATE_ENROLLABLE,
          enrollable: response.enrollable
        });
      })
      .catch((response) => {
        dispatch(loading(''));
        console.log("error response: ", response);
        dispatch(badResponse("Problem with deleting user"))
    })
  };
}

//sends async request to update course data
//must be course admin for request to succeed
//dispatches updated course data to reducer upon success
//calls badResponse upon failure
export function updateCourse(token, course) {
  return function (dispatch) {
    dispatch(loading('update Course'));

      fetch(url.concat('course'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          course
        })
      })
      .then(response => {
        if(response.status != 200) {
          throw response;
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        dispatch({
          type: types.UPDATE_COURSE,
          course: response.course
        });
      })
      .catch((response) => {
        dispatch(loading(''));
        console.log("error response: ", response);
        dispatch(badResponse("Problem with updating course"))
    })
  };
}

//sends async request to authenticate user
//dispatches new json web token upon success
//calls badResponse upon failure
export function logIn(email, password) {
  return function (dispatch) {
    dispatch(loading('logIn'));

      fetch(url.concat('login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true,
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => {
        if(response.status != 200) {
          throw response;
        }
        return response.json()
      })
      .then(response => {
        // console.log("set-cookie: ", response)
        // cookie.save("tokens",
        //   response.token,
        //   {
        //     httpOnly: true
        //   });
        dispatch(loading(''));
        dispatch(loggedIn(response));
      })
      .catch((response) => {
        dispatch(loading(''));
        if(response.status === 400) {
          //provides more specific info in alert message
          return dispatch(badResponse("Incorrect Password"));
        }
      dispatch(badResponse("Problem with login"))
      console.log("error response: ", response);
    })
  };
}

//dispatches selected course to reducer
export function selectCourse(course) {
  return {
      type: types.SELECT_COURSE,
      course
  };
}

//sends async request to fetch enrolled users and unregistered enrollable user lists for course
//must be course admin for request to succeed
//dispatches enrolled and enrollable users to reducer upon success
//calls badResponse upon failure
export function getEnrollable(token, course) {
  return function (dispatch) {
    dispatch(loading('update Course'));
    dispatch(selectCourse(course));
      fetch(url.concat('course/enrollable/', course._id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Credentials': 'include'
        }
      })
      .then(response => {
        if(response.status != 200) {
          throw response;
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        dispatch({
          type: types.UPDATE_ENROLLABLE,
          enrollable: response.enrollable,
        });
        dispatch({
          type: types.UPDATE_ENROLLED,
          enrolled: response.enrolled
        });
      })
      .catch((response) => {
        dispatch(loading(''));
        console.log("error response: ", response);
        dispatch(badResponse("Problem with retrieving enrollable and enrolled users"))
    })
  };
}

//sends async request to unenroll selected user from course
//must be course admin for request to succeed
//will not delete site admin from course
//dispatches updated enrolled users to reducer upon success
//calls badResponse upon failure
export function deleteUserFromCourse(token, course_id, email) {
  return function (dispatch) {
    dispatch(loading('update Course'));
      fetch(url.concat('users'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_id: course_id,
          email: email
        })
      })
      .then(response => {
        if(response.status != 200) {
          throw response;
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        dispatch({
          type: types.UPDATE_ENROLLED,
          enrolled: response.enrolled
        });
      })
      .catch((response) => {
        dispatch(loading(''));
        console.log("error response: ", response);
        return response.json()
      })
      .then(function(response) {
        if(response.message === 'Unable to delete site admin from course') {
          dispatch(badResponse('Unable to delete site admin from course'))
        } else {
          dispatch(badResponse("Problem with deleting user. "))
        }
      })
  };
}

//dispatches logout action to reducer
export function logOut() {
  //consider blacklisting token serverside in future
  // cookie.remove('token');
  return {
    type: types.LOG_OUT
  };
}

//sends async request to fetch pdf course completion certificate
//request will fail if user has not passed all course quizzes
//opens pdf certificate in new browser tab upon success
//calls badResponse upon failure
export function getCertificate(token, course) {
  return function (dispatch) {
    dispatch(loading('getCertificate'));
    //pull down quiz questions, then
    try {
      fetch(url.concat('users/certificate/', course.name), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'responseType': 'arraybuffer'
        }
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        }
        return response
      })
      .then(response => {
        var windowUrl = window.URL || window.webkitURL;
        var blob = new Blob([response.body], {type: "application/pdf"});
        var url = windowUrl.createObjectURL(blob);
        // saveAs(blob, "certificate.pdf")
        window.open(url, "_target")
        dispatch(loading(''));
        })
    } catch(error) {
      dispatch(badResponse("Problem with loading certificate"))
      console.log("error response: ", error);
    }
  };
}

//dispatches create quiz action to reducer
export function createQuiz() {
  return {
    type: types.CREATE_QUIZ
  };
}

//dispatches edit quiz action to reducer
export function editQuiz(itemIndex, itemName, value, subIndex) {
  return {
    type: types.UPDATE_QUIZ,
    itemName,
    value,
    itemIndex,
    subIndex
  };
}

//sends async request to delete quiz and update course quiz list
//must be course admin for request to succeed
//dispatches delete quiz to reducer and sets view to quiz list upon success
//calls badResponse upon failure
export function deleteSavedQuiz(token, userId, courseID, quizId) {
  return function (dispatch) {
    dispatch(loading('deleteQuiz'));
    try {
      fetch(url.concat('quiz/').concat(quizId + "/" + courseID), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        } else {
          return response;
        }
      })
      .then(response => response.json())
      .then((response) => {
        dispatch(loading(''));
        // browserHistory.push("/quiz");
        window.location.href="#/quiz";
        return dispatch({
          type: types.DELETE_QUIZ,
          courses: response.courses,
          courseID: courseID
        });
      })
    } catch(error) {
      dispatch(badResponse("Problem with deleting quiz"))
      console.log("error response: ", error);
    }
  }
}

//sends async request to create or update quiz, adding quiz to course quiz list when new quiz is created
//must be course admin for request to succeed
//dispatches save quiz to reducer upon success
//calls badResponse upon failure
export function saveQuiz(token, userId, courseID, quiz) {
  return function (dispatch) {
    dispatch(loading('saveQuiz'));
    try {
      fetch(url.concat('quiz/'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          courseID,
          quiz
        })
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        } else {
          return response;
        }
      })
      .then(response => response.json())
      .then((response) => {
        dispatch(loading(''));
        return dispatch({
          type: types.SAVE_QUIZ,
          quiz: response[0],
          course: response[1]
        });
      })
    } catch(error) {
      dispatch(badResponse("Problem with saving quiz"))
      console.log("error response: ", error);
    }
  }
}

//selects quiz from course quiz list
//calls toggleQuizView to switch view from quiz list to quiz start or quiz edit
//calls loadQuiz to fetch quiz data
export function selectQuiz(token, quizId, userId) {
  return function(dispatch) {
    dispatch(toggleQuizView());
    dispatch(loadQuiz(token, quizId, userId));
  }
}

//switches view from list of course quizzes to quiz start or quiz edit view
//dispatches toggle quiz view to reducer
export function toggleQuizView() {
  return {
    type: types.TOGGLE_QUIZ_VIEW
  };
}

//sends async request to fetch quiz data and any prior submissions of this quiz by this user
//quiz id and user id must be given in request url
//dispatches load quiz upon success
//calls badResponse upon failure
export function loadQuiz(token, quiz_Id, user_Id) {
  return function (dispatch) {
    dispatch(loading('loadQuiz'));
    //pull down quiz questions, then
    try {
      fetch(url.concat('quiz/',quiz_Id,"/",user_Id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        return dispatch({
          type: types.LOAD_QUIZ,
          quizData: response[0][0],
          attempts: response[1]
        });
        })
    } catch(error) {
      dispatch(badResponse("Problem with loading quiz"))
      console.log("error response: ", error);
    }
  };
}

//starts quiz
//dispatches start quiz to reducer
export function startQuiz() {
  return {
    type: types.START_QUIZ
  };
}

//selects answer
//dispatches select answer to reducer
export function selectAnswer(answerSelected, idSelected, item) {
  return {
    type: types.SELECT_ANSWER,
    answerSelected,
    idSelected,
    itemSelected: parseInt(item)
  };
}

//advances quiz to next question
//dispatches next question to reducer
export function nextQuestion() {
  return {
    type: types.NEXT_QUESTION
  };
}

//moves back one question in quiz
//dispatches previous question to reducer
export function prevQuestion() {
  return {
    type: types.PREVIOUS_QUESTION
  };
}

//sends async request to submit quiz, which saves submission to database
//dispatches submit quiz to reducer upon success
//calls badResponse upon failure
export function submitQuiz(quizData, quizId, _id, token) {
  return function (dispatch) {
    dispatch(loading('submitQuiz'));
    try {
      fetch(url.concat('quiz/submit'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          quizData: quizData,
          quiz_Id: quizId,
          user_Id: _id
        })
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        } else {
          return response;
        }
      })
      .then(response => response.json())
      .then((response) => {
        dispatch(loading(''));
        // dispatch(viewQuizzes());
        return dispatch({
          type: types.SUBMIT_QUIZ,
          score: response.score,
          attempt: response.attempt,
          passed: response.passed
        });
        })
    } catch(error) {
      dispatch(badResponse("Problem with submitting quiz"))
      console.log("error response: ", error);
    }
  }
}

//sends async request to fetch list of course lessons
//dispatches get lessons to reducer upon success
//calls badResponse upon failure
export function getLessons(token) {
  return function (dispatch) {
    dispatch(loading('lessons'));
    try {
      fetch(url.concat('lessons'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        return dispatch({
          type: types.GET_LESSONS,
          lessons: response.entries
        });
        })
    } catch(error) {
      dispatch(badResponse("Problem with loading lessons"))
      console.log("error response: ", error);
    }
  };
}

//dispatches get pdf to reducer
export function loadPreview(response) {
  return {
    type: types.GET_PDF,
    selectedPdf: response.selectedPdf || ""
  };
}

//sends async request to fetch BOX preview url for selected pdf
//dispatches loadPreview prior to fetch to clear prior BOX preview url from store, if present (allows for UI display effect)
//dispatches loadPreview with new url upon success
//calls badResponse upon failure
export function getPDF(pdfId, token) {
  return function (dispatch) {
    dispatch(loadPreview(""));
    dispatch(loading("pdf"));
    try {
      fetch(url.concat('lessons/',pdfId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(""));
          return dispatch(loadPreview(response));
        })
    } catch(error) {
      dispatch(badResponse("Problem with loading lesson"))
      console.log("error response: ", error);
    }
  };
}

//in progress---
//will send async request to upload pdf file to BOX
//will dispatch get lessons with updated course lesson list upon success
//will call badResponse upon failure
export function uploadPDF(token, courseID, file) {
  return function(dispatch) {
    dispatch(loading("uploading pdf: ", file));
      let formData = new FormData();
      formData.append("file", file[0]);
      fetch(url.concat('lessons/'), {
        method: 'POST',
        headers: {
          'Accept': 'application/pdf',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      .then(response => {
        if(response.status != 200) throw response;
        return response.json();
      })
      .then(() => {
        return dispatch(getLessons(token))
      })
      .catch(error => {
        dispatch(badResponse("Problem with uploading file"))
        console.log("error response: ", error);
      })
  }
}

export function deletePDF(token, courseID, lessonID) {
  return function(dispatch) {
    dispatch(loading("deleting file..."));
    fetch(url.concat('lessons/', courseID, "/", lessonID), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(response.status !== 200) {
        throw response;
      }
      return response.json()
    })
    .then(() => {
      dispatch(loading(''));
      return dispatch(getLessons(token))
    })
    .catch(error => {
      dispatch(badResponse("Problem with deleting file"))
      console.log("error response: ", error);
    })
  }
}
