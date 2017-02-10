import React from 'react';
import {connect} from 'react-redux';
import {createQuizView, createQuiz, addItem} from '../actions/eLearnActions';
import EditQuizItemsContainer from './EditQuizItemsContainer';
import CreateQuizView from '../components/CreateQuizView';

export const EditQuizContainer = (props) => {
  if(props.message) {
    alert(props.message);
  }
  const createQuiz = (event) => {
    event.preventDefault();
    const form = event.target.elements;
    props.createQuiz(props.token, form.title.value, props.courseId, form.minimumScore.value);
  };

  return <EditQuizItemsContainer />
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    newQuiz: state.quizReducer.newQuiz,
    courseId: state.authReducer.course._id,
    token: state.authReducer.token,
    quizSelected: state.quizReducer.quizSelected,
    quizSelectedId: state.quizReducer.quizSelectedId,
    message: state.quizReducer.message || ""
  };
}
function mapDispatchToProps(dispatch) {
  return {
    createQuizViewToggle: () => dispatch(createQuizView()),
    addItem: (item) => dispatch(addItem(item)),
    createQuiz: (token, title, courseId, minScore) => dispatch(createQuiz(token, title, courseId, minScore))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuizContainer);
