import React from 'react';
import {connect} from 'react-redux';
import QuizLandingView from '../components/QuizLandingView';

//container for QuizLandingView
//called by routes to "/quiz" endpoint
const QuizLandingContainer = (props) => {
  return (
      <QuizLandingView
        viewQuizSelected={props.viewQuizSelected}
        courseName={props.courseName}
        quizInProgress={props.quizInProgress}
        token={props.token}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    courseName: state.authReducer.course.name,
    quizInProgress: state.quizReducer.quizInProgress,
    viewQuizSelected: state.quizReducer.viewQuizSelected
  }
}

export default connect(
  mapStateToProps
)(QuizLandingContainer);
