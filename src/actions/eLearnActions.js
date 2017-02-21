// import cookie from 'react-cookie'
import * as types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';
// import {browserHistory} from 'react-router';

// const url = "http://localhost:8080/elearn/";
const url = "https://portfolio-express.herokuapp.com/elearn/"

export function loading(item) {
  return {
    type: 'LOADING',
    item
  };
}

export function badResponse(message) {
  return {
    type: 'BAD_RESPONSE',
    message
  };
}

function loggedIn(response) {
  // response.courses.forEach((course) => {
  //   course.admin = course.admin.indexOf(response._id) > -1;
  // })
  // let courses = JSON.stringify(response.courses);
  // window.localStorage.userName = response.name;
  // window.localStorage.user_Id = response._id;
  // window.localStorage.courses = courses;
  // window.localStorage.token =  response.token;
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
        if(response.status < 200 || response.status >= 300) {
          if(response.body.message === 'email already associated with an account') {
            return dispatch({
              type: types.EMAIL_USED,
              email
            });
          } else {
            let error = response;
            throw error;
          }
        }
        return response.json()
      })
      .then(response => {
        dispatch(loading(''));
        dispatch(loggedIn(response));
      })
    } catch(error) {
      console.log("error response: ", error);
      dispatch(badResponse("Problem with registration"))
    }
  };
}

export function editCourse(id, value) {
  return {
    type: types.EDIT_COURSE,
    id,
    value
  };
}

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
        if(response.status != 302) {
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
          return dispatch(badResponse("Incorrect Password"));
        }
      dispatch(badResponse("Problem with login"))
      console.log("error response: ", response);
    })
  };
}

export function selectCourse(course) {
  return {
      type: types.SELECT_COURSE,
      course
  };
}

//also returns enrolled
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

export function logOut() {
  //consider blacklisting token serverside in future
  window.localStorage.loggedIn = false;
  // cookie.remove('token');
  return {
    type: types.LOG_OUT
  };
}

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
      dispatch(badResponse("Problem with loading quiz"))
      console.log("error response: ", error);
    }
  };
}

export function createQuiz() {
  return {
    type: types.CREATE_QUIZ
  };
}

export function editQuiz(itemIndex, itemName, value, subIndex) {
  return {
    type: types.UPDATE_QUIZ,
    itemName,
    value,
    itemIndex,
    subIndex
  };
}

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

export function selectQuiz(token, quizId, userId) {
  return function(dispatch) {
    dispatch(toggleQuizView());
    dispatch(loadQuiz(token, quizId, userId));
  }
}

export function toggleQuizView() {
  return {
    type: types.TOGGLE_QUIZ_VIEW
  };
}

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

export function startQuiz() {
  return {
    type: types.START_QUIZ
  };
}

export function selectAnswer(answerSelected, idSelected, item) {
  return {
    type: types.SELECT_ANSWER,
    answerSelected,
    idSelected,
    itemSelected: parseInt(item)
  };
}

export function nextQuestion() {
  return {
    type: types.NEXT_QUESTION
  };
}

export function prevQuestion() {
  return {
    type: types.PREVIOUS_QUESTION
  };
}

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
        // withCredentials: true,
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

export function loadPreview(response) {
  return {
    type: types.GET_PDF,
    selectedPdf: response.selectedPdf || ""
  };
}

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
        // withCredentials: true,
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
