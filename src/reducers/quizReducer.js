import * as types from '../constants/actionTypes';
import quizQuestionRamdomizer from '../utils/quizDataRandomizer';

const initialState = {
  quizData: [],
  currentQuestion: undefined,
  currentQuestionIndex: null,
  score: 0,
  minimumScore: 2,
  passed: false,
  quizInProgress: false,
  attempts: []
};

export default function quizReducer(state = initialState, action) {
  let updateQuizData, currentQuestionIndex, currentQuestion, correct, passed, score, index, updatedCurrentQuestion, attempts;
  switch(action.type) {
    case types.START_QUIZ:
      return {
        ...state,
        quizData: quizQuestionRamdomizer(action.quizData),
        currentQuestion: action.quizData[0],
        currentQuestionIndex: 0,
        questionCount: action.quizData.length,
        score: 0,
        quizInProgress: true
      };
    case types.SELECT_ANSWER:
      index = state.currentQuestionIndex;
      correct = action.answerSelected === state.currentQuestion.answers[0] ?  true : false;
      updatedCurrentQuestion = {...state.currentQuestion};
      updatedCurrentQuestion.correct = correct;
      updateQuizData = state.quizData.slice(0, index).concat(updatedCurrentQuestion).concat(state.quizData.slice(index + 1, state.quizData.length));
      return {
        ...state,
        quizData: updateQuizData
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
      score = score.reduce((a,b) => {return a + b}, 0);
      attempts = state.attempts.concat(score);
      Math.max(...attempts) >= state.minimumScore ? passed = true : passed = state.passed;
      return {
        ...state,
        score,
        passed,
        quizInProgress: false,
        attempts
      };
    default:
    return state;
  }
}
