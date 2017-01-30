import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import Quiz from '../components/Quiz';

export const QuizPage = (props) => {
  return (
    <Quiz
      startQuiz={props.actions.startQuiz}
      selectAnswer={props.actions.selectAnswer}
      nextQuestion={props.actions.nextQuestion}
      prevQuestion={props.actions.prevQuestion}
      question={props.question}
      answers={props.answers}
      currentQuestionIndex={props.currentQuestionIndex}
    />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return state.quizReducer.quizData.length > 0 ?
    {
      question: state.quizReducer.currentQuestion.question,
      answers: state.quizReducer.currentQuestion.answers,
      currentQuestionIndex: state.quizReducer.currentQuestionIndex
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
