import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import {startQuiz, toggleQuizView} from '../actions/eLearnActions';
import QuizStartView from '../components/QuizStartView';

//container for QuizStartView
//called by QuizLandingView when quiz has been selected but is not in progress
export const QuizStartContainer = (props) => (
    <QuizStartView
      startQuiz={props.startQuiz}
      viewQuizzes={props.toggleQuizView}
      passed={props.passed}
      score={props.score}
      attempts={props.attempts}
      title={props.title}
    />
);

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
      title: state.quizReducer.quiz.title,
      score: state.quizReducer.score,
      passed: state.quizReducer.passed,
      attempts: state.quizReducer.attempts,
      quizSelectedId: state.quizReducer.quiz._id,
      token: state.authReducer.token,
      userId: state.authReducer._id
    };
}

function mapDispatchToProps(dispatch) {
  return {
    startQuiz: () => dispatch(startQuiz()),
    toggleQuizView: () => dispatch(toggleQuizView())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizStartContainer);
