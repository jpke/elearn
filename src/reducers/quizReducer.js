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
  let updateQuizData, currentQuestionIndex, currentQuestion, correct, passed, score, index, updatedCurrentQuestion, attempts, quiz;
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
       viewQuizSelected: true
       };
    case types.VIEW_QUIZZES:
      return {
        ...state,
        viewQuizSelected: !state.viewQuizSelected
      };
    case types.CREATE_QUIZ_VIEW: {
      return {
        ...state,
        createQuizView: !state.createQuizView
      };
    }
    // case types.CREATE_QUIZ:
    //   return {
    //     ...state,
    //     quiz: action.response,
    //     quizSelected: action.response.title,
    //     quizSelectedId: action.response._id
    //   }
    case types.UPDATE_QUIZ: {
      let quiz = JSON.parse(JSON.stringify(state.quiz));
      let itemName = action.itemName.toString();
      if(itemName === "title"){
        console.log("title running");
        quiz.title = action.value;
      } else if(itemName === "minimumScore") {
        console.log("minscore running");
        quiz.minimumScore = action.value;
      } else if(itemName === "question") {
        quiz.items[action.itemIndex].question = action.value;
      } else if(itemName === "answer") {
        quiz.items[action.itemIndex].answers[action.subIndex].answer = action.value;
      } else if(itemName === "answerCorrect") {
        quiz.items[action.itemIndex].answers = quiz.items[action.itemIndex].answers.map((answer, idx) => {
          answer.correct = action.subIndex == idx ? true : false;
          console.log("answer: ", answer,action.subIndex == idx, action.subIndex, idx);
          return answer;
        });
        console.log(quiz.items[action.itemIndex].answers);
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
        quiz
      };
    };
    case types.SAVE_QUIZ:
      return {
        ...state,
        quiz: action.quiz
      };
    case types.START_QUIZ:
      let quizIteration = quizDataRamdomizer(action.quizData.items);
      return {
        ...state,
        quiz: action.quizData,
        quizData: quizIteration,
        currentQuestion: quizIteration[0],
        currentQuestionIndex: 0,
        questionCount: quizIteration.length,
        score: 0,
        attempts: action.attempts,
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
      let attempts = state.attempts.slice().concat(action.attempts);
      let passed = calcPassed(attempts, state.minimumScore);
      return {
        ...state,
        score: action.score,
        passed,
        quizInProgress: false,
        attempts
      };
    default:
    return state;
  }
}
