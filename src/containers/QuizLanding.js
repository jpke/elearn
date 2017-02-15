import React from 'react';
import {connect} from 'react-redux';
import QuizLandingView from '../components/QuizLandingView';

const QuizLanding = (props) => {
  return (
      <QuizLandingView
        viewQuizSelected={props.viewQuizSelected}
        quizInProgress={props.quizInProgress}
        token={props.token}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    quizInProgress: state.quizReducer.quizInProgress,
    viewQuizSelected: state.quizReducer.viewQuizSelected
  }
}

export default connect(
  mapStateToProps
)(QuizLanding);