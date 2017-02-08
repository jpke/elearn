import React from 'react';
import {connect} from 'react-redux';
import listCreator from '../utils/listCreator';
import {selectQuiz, createQuizView} from '../actions/eLearnActions';
import CreateQuizContainer from './CreateQuizContainer';
import QuizListView from '../components/QuizListView';

export const QuizListContainer = (props) => {
  console.log("props: ", props.admin);
  props.quizzes ? "" : window.location.href="/";
  return (
    <div>
    {props.createQuizView && props.admin ?
      <CreateQuizContainer />
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
    createQuizView: state.quizReducer.createQuizView
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
