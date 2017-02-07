import React from 'react';
import {connect} from 'react-redux';
import listCreator from '../utils/listCreator';
import {selectQuiz} from '../actions/eLearnActions';
import QuizListView from '../components/QuizListView';

export const QuizListContainer = (props) => {
  console.log('quiz list cont: ', props);
  return (
      <QuizListView
        listCreator={listCreator}
        quizzes={props.quizzes}
        selectQuiz={props.selectQuiz}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    quizzes: state.authReducer.course.quizzes
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectQuiz: (quiz) => dispatch(selectQuiz(quiz))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizListContainer);
