// import cookie from 'react-cookie'
import * as types from '../constants/actionTypes';

const url = "http://localhost:8080/elearn/";

export function loading(item) {
  return {
    type: 'LOADING',
    item
  };
}

function loggedIn(response) {
  console.log("response: ", response);
  response.courses.forEach((course) => {
    course.admin = course.admin.indexOf(response._id) > -1;
  })
  let courses = JSON.stringify(response.courses);
  window.localStorage.userName = response.name;
  window.localStorage.user_Id = response._id;
  window.localStorage.courses = courses;
  window.localStorage.token =  response.token;
  return {
    type: types.LOG_IN,
    userName: response.name,
    user_Id: response._id,
    courses: response.courses,
    token: response.token
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
    }
  };
}

export function logIn(email, password) {
  return function (dispatch) {
    dispatch(loading('logIn'));
    try {
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
          let error = response;
          throw error;
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
    } catch(error) {
      console.log("error response: ", error);
    }
  };
}

export function selectCourse(course) {
  return {
    type: types.SELECT_COURSE,
    course
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

export function selectQuiz(quiz) {
  return {
    type: types.SELECT_QUIZ,
    quizName: quiz.title,
    quiz_Id: quiz._id
  };
}

export function viewQuizzes() {
  return {
    type: types.VIEW_QUIZZES
  };
}

export function startQuiz(token, quiz_Id, user_Id) {
  return function (dispatch) {
    dispatch(loading('startQuiz'));
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
          type: types.START_QUIZ,
          quizData: response[0][0],
          attempts: response[1]
        });
        })
    } catch(error) {
      console.log("error response: ", error);
    }
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
          score: response.score
        });
        })
    } catch(error) {
      console.log("error response: ", error);
    }
  }
}

export function getLessons(token) {
  return function (dispatch) {
    // let cookieToken = cookie.load('token');
    // console.log("cookieToken: ", cookieToken);
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
      console.log("error response: ", error);
    }
  };
}
