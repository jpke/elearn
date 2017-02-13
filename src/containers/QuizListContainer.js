import React from 'react';
import {connect} from 'react-redux';
import listCreator from '../utils/listCreator';
import {selectQuiz, toggleQuizView} from '../actions/eLearnActions';
import EditQuizContainer from './EditQuizContainer';
import QuizListView from '../components/QuizListView';

export const QuizListContainer = (props) => {
  console.log("quiz list props: ", props);
  props.quizzes ? "" : window.location.href="/";

  const editQuiz = (modify) => {
    window.location.href="#/quiz/modify";
    if(modify) props.toggleQuizView();
  }

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
        editQuiz={editQuiz}
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
    toggleQuizView: () => dispatch(toggleQuizView())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizListContainer);
