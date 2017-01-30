import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import Quiz from '../components/Quiz';

export const QuizPage = (props) => {
  return (
    <Quiz
      selectAnswer={props.actions.selectAnswer}
      nextQuestion={props.actions.nextQuestion}
      prevQuestion={props.actions.previousQuestion}
    />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    question: state.currentQuestion.question,
    answers: state.currentQuestion.answers,
    currentQuestionIndex: state.currentQuestionIndex
  };
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
