import * as types from '../constants/actionTypes';
import quizQuestionRamdomizer from '../utils/quizDataRandomizer';
import evaluateSelection from '../utils/evaluateSelection';

const initialState = {
  quizData: 0,
  currentQuestion: undefined,
  currentQuestionIndex: null,
  score: 0,
  minimumScore: 3,
  passed: false,
  quizInProgress: false,
  attempts: [],
};

export default function quizReducer(state = initialState, action) {
  let updateQuizData, currentQuestionIndex, currentQuestion, correct, passed, score, index, updatedCurrentQuestion, attempts;
  switch(action.type) {
    case types.START_QUIZ:
    console.log("reducer: ", action.quizData);
      let quizIteration = quizQuestionRamdomizer(action.quizData.items);
      console.log("iteration: ", quizIteration);
      return {
        ...state,
        quiz: action.quizData,
        quizData: quizIteration,
        currentQuestion: quizIteration[0],
        currentQuestionIndex: 0,
        questionCount: quizIteration.length,
        score: 0,
        minimumScore: action.quizData.minimumScore,
        quizInProgress: true
      };
    case types.SELECT_ANSWER:
      index = state.currentQuestionIndex;
      correct = evaluateSelection(action.idSelected, state.currentQuestion);
      updatedCurrentQuestion = JSON.parse(JSON.stringify(state.currentQuestion));
      updatedCurrentQuestion.correct = correct;
      updatedCurrentQuestion.idSelected = action.idSelected;
      updatedCurrentQuestion.itemSelected = action.itemSelected;
      updateQuizData = state.quizData.slice(0, index).concat(updatedCurrentQuestion).concat(state.quizData.slice(index + 1, state.quizData.length));
      return {
        ...state,
        quizData: updateQuizData,
        currentQuestion: updatedCurrentQuestion,
        idSelected: action.idSelected
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
      attempts = state.attempts.concat(action.score);
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
