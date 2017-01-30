import * as types from '../constants/actionTypes';

export function startQuiz() {
  return function (dispatch) {
    //pull down quiz questions, then
    let quizData = [
      {
        question: "question 1",
        answers: [
          "correct answer",
          "wrong answer",
          "another wrong answer",
          "and another wrong answer"
        ]
      },
      {
        question: "question 2",
        answers: [
          "correct answer",
          "wrong answer",
          "another wrong answer",
          "and another wrong answer"
        ]
      },
      {
        question: "question 3",
        answers: [
          "correct answer",
          "wrong answer",
          "another wrong answer",
          "and another wrong answer"
        ]
      }
    ];
    return dispatch({
      type: types.START_QUIZ,
      quizData
    });
  };
}

export function selectAnswer(answerSelected) {
  return {
    type: types.SELECT_ANSWER,
    answerSelected
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
