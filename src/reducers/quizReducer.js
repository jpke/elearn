import * as types from '../constants/actionTypes';

const initialState = {
  quizData: [],
  currentQuestion: undefined,
  currentQuestionIndex: null,
  score: 0
};

export default function quizReducer(state = initialState, action) {
  let currentQuestionIndex, currentQuestion, score;
  switch(action.type) {
    case types.START_QUIZ:
      return {
        ...state,
        quizData: action.quizData,
        currentQuestion: action.quizData[0],
        currentQuestionIndex: 0,
        score: 0
      };
    case types.SELECT_ANSWER:
      score;
      action.answerSelected === state.quizData[state.currentQuestionIndex].answer[0] ? score = state.score + 1 : state.score;
      return {
        ...state,
        score: score
      };
    case types.NEXT_QUESTION:
      currentQuestionIndex = state.currentQuestionIndex + 1;
      currentQuestion = state.quizData[currentQuestionIndex];
      return {
        ...state,
        currentQuestion: currentQuestion,
        currentQuestionIndex: currentQuestionIndex
      };
    case types.PREVIOUS_QUESTION:
      currentQuestionIndex = state.currentQuestionIndex - 1;
      currentQuestion = state.quizData[currentQuestionIndex];
      return {
        ...state,
        currentQuestion: currentQuestion,
        currentQuestionIndex: currentQuestionIndex
      };
    default:
    return state;
  }
}
