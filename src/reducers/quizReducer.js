import * as types from '../constants/actionTypes';
import quizQuestionRamdomizer from '../utils/quizDataRandomizer';

const initialState = {
  quizData: [],
  currentQuestion: undefined,
  currentQuestionIndex: null,
  score: 0,
  minimumScore: 2,
  passed: false,
  quizInProgress: false
};

export default function quizReducer(state = initialState, action) {
  let quizData, currentQuestionIndex, currentQuestion, correct, passed;
  switch(action.type) {
    case types.START_QUIZ:
      return {
        ...state,
        quizData: quizQuestionRamdomizer(action.quizData),
        currentQuestion: action.quizData[0],
        currentQuestionIndex: 0,
        questionCount: action.quizData.length,
        score: 0
      };
    case types.SELECT_ANSWER:
      correct = action.answerSelected === state.currentQuestion.answers[0] ?  true : false;
      quizData = [...state.quizData];
      quizData[state.currentQuestionIndex].correct = correct;
      return {
        ...state,
        quizData
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
    case types.SUBMIT_QUIZ:
      score = state.quizData.map(question => {
        return question.correct ? 1 : 0;
      });
      score.reduce((a,b) => {return a + b}, 0);
      score >= state.minimumScore ? passed = true : passed = state.passed;
      return {
        ...state,
        score,
        passed
      };
    default:
    return state;
  }
}
