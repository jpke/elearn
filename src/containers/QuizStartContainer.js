import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import {startQuiz, viewQuizzes} from '../actions/eLearnActions';
import QuizStartView from '../components/QuizStartView';

export const QuizStartContainer = (props) => {
  console.log("quizstartcontainer props: ", props);

  const startQuiz = () => {
    props.startQuiz(props.token, props.quizSelectedId);
  }

  return (
      <QuizStartView
        startQuiz={startQuiz}
        viewQuizzes={props.viewQuizzes}
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
      token: state.authReducer.token
    };
}

function mapDispatchToProps(dispatch) {
  return {
    startQuiz: (token, quizId) => dispatch(startQuiz(token, quizId)),
    viewQuizzes: () => dispatch(viewQuizzes())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizStartContainer);
