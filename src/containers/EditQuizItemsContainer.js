import React from 'react';
import {connect} from 'react-redux';
import {createQuizView, createQuiz, addItem} from '../actions/eLearnActions';
import EditQuizItemContainer from './EditQuizItemContainer';
import EditQuizTitleView from '../components/EditQuizTitleView';
import seedItem from '../utils/seedItem';

export const EditQuizItemsContainer = (props) => {
  console.log("edit items cont ", props);
  const createQuiz = (event) => {
    event.preventDefault();
    const form = event.target.elements;
    editQuizTitle(props.token, form.title.value, props.courseId, form.minimumScore.value);
  };

  let items = props.items.slice();
  if(items == false) {
    items = [seedItem];
  }
  items = items.map((item, index) => {
    return <EditQuizItemContainer key={index} item={item} index={index} />
  });

  const editQuizTitle = (event) => {
    event.preventDefault();
    console.log(event.target);
  };
  console.log("items into render: ", items);
  return (
    <div>
      <p>Something here</p>

    {items}
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
)(EditQuizItemsContainer);
