import React from 'react';
import {connect} from 'react-redux';
import listCreator from '../utils/listCreator';
import passedList from '../utils/passedList';
import {selectQuiz, createQuiz, toggleQuizView} from '../actions/eLearnActions';
import EditQuizContainer from './EditQuizContainer';
import QuizListView from '../components/QuizListView';

export const QuizListContainer = (props) => {
  props.quizzes ? "" : window.location.href="/";

  const editQuiz = (modify, quiz) => {
    window.location.href="#/quiz/modify";
    if(modify) {
      props.toggleQuizView();
    } else {
      props.createQuiz();
    }
  }

  const selectQuiz = (quiz) => {
    props.selectQuiz(props.token, quiz._id, props.userId);
  }

  return (
    <div>
    {props.viewQuizSelected && props.admin ?
      <EditQuizContainer />
    :
      <QuizListView
        listCreator={listCreator}
        quizzes={props.quizzes}
        passedList={passedList}
        passed={props.passed}
        admin={props.admin}
        selectQuiz={selectQuiz}
        editQuiz={editQuiz}
      />
    }
    </div>
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    quizzes: state.authReducer.course.quizzes || "",
    passed: state.authReducer.passed,
    admin: state.authReducer.course.admin,
    viewQuizSelected: state.quizReducer.viewQuizSelected,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectQuiz: (token, quizId, userId) => dispatch(selectQuiz(token, quizId, userId)),
    createQuiz: () => dispatch(createQuiz()),
    toggleQuizView: () => dispatch(toggleQuizView()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizListContainer);
