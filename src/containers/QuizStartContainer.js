import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import {startQuiz, toggleQuizView} from '../actions/eLearnActions';
import QuizStartView from '../components/QuizStartView';

export const QuizStartContainer = (props) => {

  const startQuiz = () => {
    props.startQuiz(props.token, props.quizSelectedId, props.userId);
  }

  return (
      <QuizStartView
        startQuiz={startQuiz}
        viewQuizzes={props.toggleQuizView}
        passed={props.passed}
        score={props.score}
        attempts={props.attempts}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
      score: state.quizReducer.score,
      passed: state.quizReducer.passed,
      attempts: state.quizReducer.attempts,
      quizSelectedId: state.quizReducer.quizSelectedId,
      token: state.authReducer.token,
      userId: state.authReducer._id
    };
}

function mapDispatchToProps(dispatch) {
  return {
    startQuiz: (token, quizId, userId) => dispatch(startQuiz(token, quizId, userId)),
    toggleQuizView: () => dispatch(toggleQuizView())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizStartContainer);
