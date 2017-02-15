import React from 'react';
import {connect} from 'react-redux';
import {createQuiz} from '../actions/eLearnActions';
import EditQuizItemView from '../components/EditQuizItemView';

export const EditQuizItemContainer = (props) => {
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
    createQuiz: (token, title, courseId, minScore) => dispatch(createQuiz(token, title, courseId, minScore))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuizItemContainer);
