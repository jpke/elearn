import React from 'react';
import {connect} from 'react-redux';
import listCreator from '../utils/listCreator';
import {selectQuiz, createQuizView} from '../actions/eLearnActions';
import EditQuizContainer from './EditQuizContainer';
import QuizListView from '../components/QuizListView';

export const QuizListContainer = (props) => {
  console.log("quiz list props: ", props);
  props.quizzes ? "" : window.location.href="/";
  return (
    <div>
    {props.viewQuizSelected && props.admin ?
      <EditQuizContainer />
    :
      <QuizListView
        listCreator={listCreator}
        quizzes={props.quizzes}
        admin={props.admin}
        selectQuiz={props.selectQuiz}
        createQuizViewToggle={props.createQuizViewToggle}
      />
    }
    </div>
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    quizzes: state.authReducer.course.quizzes,
    admin: state.authReducer.course.admin,
    viewQuizSelected: state.quizReducer.viewQuizSelected
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectQuiz: (quiz) => dispatch(selectQuiz(quiz)),
    createQuizViewToggle: () => dispatch(createQuizView())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizListContainer);
