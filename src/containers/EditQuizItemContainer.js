import React from 'react';
import {connect} from 'react-redux';
import {createQuizView, createQuiz, addItem} from '../actions/eLearnActions';
import EditQuizItemView from '../components/EditQuizItemView';
import EditQuizTitleView from '../components/EditQuizTitleView';

export const EditQuizItemContainer = (props) => {
  console.log("item Container: " ,props);
  const editQuizItem = (event) => {
    event.preventDefault();
    const form = event.target.elements;
    // const items =
    // editQuizItem(props.token, form.title.value, props.courseId form.minimumScore.value);
  };

  return (
    <div>
      <p>Edit quiz here</p>
      <EditQuizItemView
        question={props.item.question}
        answers={props.item.answers}
      />
    </div>
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    quizSelectedId: state.quizReducer.quizSelectedId,
    items: state.quizReducer.quizSelected.items,
    title: state.quizReducer.quizSelected.title,
    minimumScore: state.quizReducer.quizSelected.minimumScore,
    courseId: state.authReducer.course._id,
    token: state.authReducer.token
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
)(EditQuizItemContainer);
