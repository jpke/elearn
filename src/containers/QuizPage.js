import React from 'react';
import {connect} from 'react-redux';
import Quiz from '../components/Quiz';

const QuizPage = (props) => {
  return (
      <Quiz
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
)(QuizPage);
