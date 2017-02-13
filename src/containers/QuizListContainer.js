import React from 'react';
import {connect} from 'react-redux';
import listCreator from '../utils/listCreator';
import {selectQuiz, toggleQuizView, selectQuizToEdit} from '../actions/eLearnActions';
import EditQuizContainer from './EditQuizContainer';
import QuizListView from '../components/QuizListView';

export const QuizListContainer = (props) => {
  props.quizzes ? "" : window.location.href="/";

  const editQuiz = (modify, quiz) => {
    window.location.href="#/quiz/modify";
    if(modify) {
      props.toggleQuizView();
      // props.selectQuizToEdit(props.token, quiz._id, props.userId);
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
    quizzes: state.authReducer.course.quizzes,
    admin: state.authReducer.course.admin,
    viewQuizSelected: state.quizReducer.viewQuizSelected,
    token: state.authReducer.token,
    userId: state.authReducer._id
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectQuiz: (token, quizId, userId) => dispatch(selectQuiz(token, quizId, userId)),
    toggleQuizView: () => dispatch(toggleQuizView()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizListContainer);
