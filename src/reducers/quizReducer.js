import * as types from '../constants/actionTypes';
import quizDataRamdomizer from '../utils/quizDataRandomizer';
import evaluateSelection from '../utils/evaluateSelection';
import calcPassed from '../utils/calcPassed';
import seedItem from '../utils/seedItem';

const initialState = {
  quizzes: [],
  quizSelected: false,
  viewQuizSelected: false,
  quizData: 0,
  currentQuestion: undefined,
  currentQuestionIndex: null,
  score: 0,
  minimumScore: 3,
  passed: false,
  quizInProgress: false,
  attempts: [],
  createQuizView: false,
  newQuiz: false,
  quiz: seedItem
};

export default function quizReducer(state = initialState, action) {
  let updateQuizData, currentQuestionIndex, currentQuestion, correct, passed, index, updatedCurrentQuestion, attempts, quiz, itemName, quizIteration;
  switch(action.type) {
    case types.SELECT_COURSE:
      return {
        ...state,
        quizzes: action.quizzes
      }
    case types.SELECT_QUIZ:
      return {
       ...state,
       quizSelected: action.quizName,
       quizSelectedId: action.quiz_Id,
       };
    case types.TOGGLE_QUIZ_VIEW: {
      return {
        ...state,
        viewQuizSelected: !state.viewQuizSelected,
        message: ""
      };
    }
    case types.CREATE_QUIZ:
      return {
        ...state,
        quiz: seedItem
      };
    case types.UPDATE_QUIZ: {
      quiz = JSON.parse(JSON.stringify(state.quiz));
      itemName = action.itemName.toString();
      if(itemName === "title"){
        quiz.title = action.value;
      } else if(itemName === "minimumScore") {
        quiz.minimumScore = action.value;
      } else if(itemName === "question") {
        quiz.items[action.itemIndex].question = action.value;
      } else if(itemName === "answer") {
        quiz.items[action.itemIndex].answers[action.subIndex].answer = action.value;
      } else if(itemName === "answerCorrect") {
        quiz.items[action.itemIndex].answers = quiz.items[action.itemIndex].answers.map((answer, idx) => {
          answer.correct = action.subIndex == idx ? true : false;
          return answer;
        });
      } else if(itemName === "deleteItem") {
          if(quiz.items.length > 1) {
            quiz.items = quiz.items.slice(0,action.itemIndex).concat(quiz.items.slice(action.itemIndex + 1, quiz.items.length));
          } else return {
            ...state,
            message: "Quiz must have at least one question."
          };
      } else if(itemName === "addAnswer") {
        quiz.items[action.itemIndex].answers.push(seedItem.items[0].answers[0]);
      } else if(itemName === "addItem") {
        quiz.items.push(seedItem.items[0]);
      } else if(itemName === 'deleteQuiz') {
        quiz = seedItem;
      }
      return {
        ...state,
        quiz,
        message: ""
      };
    }
    case types.DELETE_QUIZ:
      return {
        ...state,
        quiz: seedItem,
        message: ""
      };
    case types.SAVE_QUIZ:
      return {
        ...state,
        quiz: action.quiz,
        message: "Quiz saved!"
      };
    case types.LOAD_QUIZ:
      quizIteration = JSON.parse(JSON.stringify(action.quizData.items));
      quizIteration = quizDataRamdomizer(quizIteration);
      passed = calcPassed(action.attempts, action.quizData.minimumScore);
      return {
        ...state,
        quiz: action.quizData,
        quizData: quizIteration,
        currentQuestion: quizIteration[0],
        currentQuestionIndex: 0,
        questionCount: quizIteration.length,
        score: 0,
        passed,
        attempts: action.attempts,
        minimumScore: action.quizData.minimumScore,
      };
    case types.START_QUIZ:
      updateQuizData = JSON.parse(JSON.stringify(state.quiz.items));
      quizIteration = quizDataRamdomizer(updateQuizData);
      return {
        ...state,
        quizData: quizIteration,
        currentQuestion: quizIteration[0],
        currentQuestionIndex: 0,
        questionCount: quizIteration.length,
        score: 0,
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
      if(state.attempts) {
          attempts = JSON.parse(JSON.stringify(state.attempts)).concat(action.attempt);
      } else {
        attempts = action.attempt;
      }
      passed = calcPassed(attempts, state.minimumScore);
      return {
        ...state,
        score: action.score,
        attempts: attempts,
        passed: passed,
        quizInProgress: false
      };
    default:
    return state;
  }
}
