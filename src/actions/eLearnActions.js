import * as types from '../constants/actionTypes';

export function loading(item) {
  return {
    type: 'LOADING',
    item
  };
}

export function register(userName, email, password) {
  return function (dispatch) {
    try {
      fetch('http://localhost:8080/elearn/users', {
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
        return dispatch({
          type: types.LOG_IN,
          userName,
          user_Id: response._id,
          token: response.token
        });
      })
    } catch(error) {
      console.log("error response: ", error);
    }
  };
}

export function logIn(email, password) {
  return function (dispatch) {
    try {
      fetch('http://localhost:8080/elearn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        }
        return response.json()
      })
      .then(response => {
        window.localStorage.token = response.token;
        return dispatch({
          type: types.LOG_IN,
          userName: response.userName,
          user_Id: response._id,
          token: response.token
        });
      })
    } catch(error) {
      console.log("error response: ", error);
    }
  };
}

export function logOut() {
  //consider blacklisting token serverside in future
  window.localStorage.token = "";
  return {
    type: types.LOG_OUT
  };
}

export function startQuiz(token) {
  console.log("action token ", token);
  return function (dispatch) {
    //pull down quiz questions, then
    try {
      fetch('http://localhost:8080/elearn/quiz', {
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
          return dispatch({
            type: types.START_QUIZ,
            quizData: response
          });
        })
    } catch(error) {
      console.log("error response: ", error);
    }
  };
}

export function selectAnswer(answerSelected, idSelected) {
  return {
    type: types.SELECT_ANSWER,
    answerSelected,
    idSelected: parseInt(idSelected)
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

export function submitQuiz(quizData, quizTitle, quizId, _id, token) {
  console.log("submitQuiz called");
  let score = quizData.map(question => {
    return question.correct ? 1 : 0;
  });
  score = score.reduce((a,b) => {return a + b}, 0);
  return function (dispatch) {
    try {
      fetch('http://localhost:8080/elearn/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: quizTitle,
          quiz: quizData,
          instanceOf: quizId,
          user: _id,
          score
        })
      })
      .then(response => {
        if(response.status < 200 || response.status >= 300) {
          let error = response;
          throw error;
        }
      })
      .then(() => {
          return dispatch({
            type: types.SUBMIT_QUIZ,
            score
          });
        })
    } catch(error) {
      console.log("error response: ", error);
    }
  }
}

export function getLessons(token) {
  return function (dispatch) {
    dispatch(loading('lessons'));
    try {
      fetch('http://localhost:8080/elearn/lessons', {
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

export function getPDF(pdfId, token) {
  return function (dispatch) {
    dispatch(loading("pdf"));
    try {
      fetch('http://localhost:8080/elearn/lessons/'.concat(pdfId), {
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
        dispatch(loading(""));
        console.log("response: ", response);
          return dispatch({
            type: types.GET_PDF,
            response
          });
        })
    } catch(error) {
      console.log("error response: ", error);
    }
  };
}
