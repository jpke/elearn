import * as types from '../constants/actionTypes';
import quizDataRamdomizer from '../utils/quizDataRandomizer';
import evaluateSelection from '../utils/evaluateSelection';
import calcPassed from '../utils/calcPassed';
import seedItem from '../utils/seedItem';

//initialize quizReducer state
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

//define quizReducer
export default function quizReducer(state = initialState, action) {
  //declare variables used in reducer
  let updateQuizData, currentQuestionIndex, currentQuestion, correct, passed, index, updatedCurrentQuestion, attempts, quiz, itemName, quizIteration;

  //switch block to define behvaior for each case
  switch(action.type) {

    //
    // case types.SELECT_COURSE:
    //   return {
    //     ...state,
    //     quizzes: action.quizzes
    //   }

    //toggles quiz view between quiz list and quiz start/edit
    //clears any message left from edit quiz
    case types.TOGGLE_QUIZ_VIEW: {
      return {
        ...state,
        viewQuizSelected: !state.viewQuizSelected,
        message: ""
      };
    }

    //creates new quiz, setting quiz to seedItem (default quiz template)
    case types.CREATE_QUIZ:
      return {
        ...state,
        quiz: seedItem
      };

    //updates quiz state with changes made by user via form input in edit quiz view
    //only updates appropriate area of quiz
    case types.UPDATE_QUIZ: {
      //immutable quiz deep copy
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

    //deletes quiz from state by reseting quiz to seedItem
    //also clears any prior message in quiz view
    case types.DELETE_QUIZ:
      return {
        ...state,
        quiz: seedItem,
        message: ""
      };

    //updates state with saved quiz, displays confirmation message
    //called upon success of saveQuiz fetch request, which saves quiz and updates course quiz list serverside
    case types.SAVE_QUIZ:
      return {
        ...state,
        quiz: action.quiz,
        message: "Quiz saved!"
      };

    //updates state with quiz data and prior submissions of quiz selected by user
    //called upon success of loadQuiz fetch request, which pulls data from database
    case types.LOAD_QUIZ:
      //immutable quiz deep copy, to randomize this quiz attempt
      quizIteration = JSON.parse(JSON.stringify(action.quizData.items));
      //randomizes quiz question order and answers
      quizIteration = quizDataRamdomizer(quizIteration);
      //determines if any prior submissions of quiz passed minimum score required
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

    //starts quiz, reinitializing quiz attempt data, and randomizing quiz question order and answers for attempt
    case types.START_QUIZ:
      //immutable quiz deep copy, to allow this attempt to be randomized without affecting underlying data
      updateQuizData = JSON.parse(JSON.stringify(state.quiz.items));
      //randomizes quiz question order and answers
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

    //updates state to reflect quiz answer currently selected by user
    case types.SELECT_ANSWER:
      index = state.currentQuestionIndex;
      //determines if current answer selection is correct
      correct = evaluateSelection(action.idSelected, state.currentQuestion);
      //immutable deep copy of current question
      updatedCurrentQuestion = JSON.parse(JSON.stringify(state.currentQuestion));

      //updates current question with current answer selection, whether it is correct and the id and answer text selected
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

    //sets currently visible question to next question in quiz attempt
    case types.NEXT_QUESTION:
      currentQuestionIndex = state.currentQuestionIndex + 1;
      currentQuestion = state.quizData[currentQuestionIndex];
      return {
        ...state,
        currentQuestion: currentQuestion,
        currentQuestionIndex: currentQuestionIndex
      };

    //sets currently visible question to previous question in quiz attempt
    case types.PREVIOUS_QUESTION:
      currentQuestionIndex = state.currentQuestionIndex - 1;
      currentQuestion = state.quizData[currentQuestionIndex];
      return {
        ...state,
        currentQuestion: currentQuestion,
        currentQuestionIndex: currentQuestionIndex
      };

    //updates state with new attempt, and whether quiz was passed in any attempts by user
    //called upon success of submitQuiz fetch request, which grades and saves attempt to database
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
