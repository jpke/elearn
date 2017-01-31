import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import Quiz from '../components/Quiz';
// import QuizLanding from '../components/QuizLanding';

export const QuizPage = (props) => {
  return (
      <Quiz
        startQuiz={props.actions.startQuiz}
        selectAnswer={props.actions.selectAnswer}
        nextQuestion={props.actions.nextQuestion}
        prevQuestion={props.actions.prevQuestion}
        submitQuiz={props.actions.submitQuiz}
        question={props.question}
        answers={props.answers}
        idSelected={props.idSelected}
        currentQuestionIndex={props.currentQuestionIndex}
        questionCount={props.questionCount}
        score={props.score}
        quizInProgress={props.quizInProgress}
        passed={props.passed}
        attempts={props.attempts}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return state.quizReducer.quizData.length > 0 ?
    {
      question: state.quizReducer.currentQuestion.question,
      answers: state.quizReducer.currentQuestion.answers,
      idSelected: state.quizReducer.currentQuestion.idSelected,
      currentQuestionIndex: state.quizReducer.currentQuestionIndex,
      questionCount: state.quizReducer.questionCount,
      score: state.quizReducer.score,
      quizInProgress: state.quizReducer.quizInProgress,
      passed: state.quizReducer.passed,
      attempts: state.quizReducer.attempts,
    }
  :
  {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizPage);
