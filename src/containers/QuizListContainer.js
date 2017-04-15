import React from 'react';
import {connect} from 'react-redux';
import QuizListCreator from '../utils/QuizListCreator';
import passedQuizList from '../utils/passedQuizList';
import {selectQuiz, createQuiz, toggleQuizView} from '../actions/eLearnActions';
import QuizListView from '../components/QuizListView';

//container for QuizListView
//called by QuizLandingView when quiz is not in progress and either not selected or viewQuizSelected is toggled false
//defines editQuiz and selectQuiz sent into QuizListView
export const QuizListContainer = (props) => {
  //editQuiz is called on existing quiz with the argument "modify" passed in. This toggles viewQuizSelected (selectQuiz is also called in this case, causing the selected quiz to display in EditQuizContainer)
  //calling editQuiz without passing "modify" as an argument is needed to toggle viewQuizSelected so returning from EditQuizContainer will not land on QuizStartContainer, returning to the QuizListContainer instead (see QuizLandingView)
  const editQuiz = (modify) => {
    if(modify === "modify") {
      props.toggleQuizView();
    } else {
      props.createQuiz();
    }
  }
  //this is called whenever a listed quiz is selected
  //calls the selectQuiz action, which fetches the quiz data through an async request to the server
  //container provides token and user id to the action call
  const selectQuiz = (quiz) => {
    props.selectQuiz(props.token, quiz._id, props.userId);
  }

  return (
      <QuizListView
        listCreator={QuizListCreator}
        quizzes={props.quizzes}
        passedQuizList={passedQuizList}
        passed={props.passed}
        admin={props.admin}
        selectQuiz={selectQuiz}
        editQuiz={editQuiz}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    quizzes: state.authReducer.course.quizzes,
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
