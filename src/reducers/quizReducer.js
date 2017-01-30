import * from '../constants/actionTypes';

export default function quizReducer(state = {}, action) {
  switch(action.type) {
    case START_QUIZ:
      return {
        ...state,
        quizData,
        currentQuestion: quizData[0]
        currentQuestionIndex: 0,
        score: 0
      };
    case SELECT_ANSWER:
      let score;
      action.answerSelected === state.quizData[state.currentQuestionIndex].answer[0] ? score = state.score + 1 : state.score;
      return {
        ...state,
        score: score
      };
    case NEXT_QUESTION:
      let currentQuestionIndex = state.currentQuestionIndex + 1;
      let currentQuestion = state.quizData[currentQuestionIndex];
      return {
        ...state,
        currentQuestion: currentQuestion,
        currentQuestionIndex: currentQuestionIndex
      };
    case PREVIOUS_QUESTION:
      let currentQuestionIndex = state.currentQuestionIndex - 1;
      let currentQuestion = state.quizData[currentQuestionIndex];
      return {
        ...state,
        currentQuestion: currentQuestion,
        currentQuestionIndex: currentQuestionIndex
      };
  }
}
