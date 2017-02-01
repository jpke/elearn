import * as types from '../constants/actionTypes';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsIm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImVtYWlsIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IiQyYSQxMCRGeGF2Si5ON0tTTjRLcjA3ckMvNTFlMmtpMUdrSHNtUzFROExsWG9jajNBb3M3WHo3OHJsNiIsImVtYWlsIjoianBlYXJuZXN0MDhAZ21haWwuY29tIiwibmFtZSI6IkpQIiwiX2lkIjoiNTg5MTAzYzM1ZTVhNTg1YWNlYjI4NjgzIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W251bGxdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNDg1OTAwOTYxLCJleHAiOjE0ODU5ODczNjF9.zWV1HyhtTw3bRC9dTK3uWlWgIbAwbh_S3OuLx_f5lUY";

export function startQuiz() {
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

export function submitQuiz(quizData, quizTitle, quizId, _id) {
  console.log("submitQuiz called");
  let score = quizData.map(question => {
    return question.correct ? 1 : 0;
  });
  score = score.reduce((a,b) => {return a + b}, 0);
  return function (dispatch) {
    //pull down quiz questions, then

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
