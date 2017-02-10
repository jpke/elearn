import React from 'react';
import {connect} from 'react-redux';
import {createQuizView, createQuiz, addItem, editQuiz} from '../actions/eLearnActions';
import EditQuizItemView from '../components/EditQuizItemView';
import EditQuizTitleView from '../components/EditQuizTitleView';
import seedItem from '../utils/seedItem';

export const EditQuizItemsContainer = (props) => {
  console.log("edit items cont ", props);

  const editQuizItem = (event) => {
    event.preventDefault();
    console.log("target: ", event.target);
    const target = event.target.id.split(" ");
    const itemIndex = target[0];
    const itemName = target[1];
    const value = event.target.value;
    const subIndex = target[2];
    console.log("value: ", value);
    props.editQuiz(itemIndex, itemName, value, subIndex)


  };

  const deleteAnswer = (event) => {
    console.log(event.target);
    // answers = answers.slice(0,answerIndex).concat(answers.slice(answerIndex+1,answers.length));
  };

  const addAnswer = (event) => {
    console.log(event.target);
    const newAnswer = {answer: "Add answer here", correct: false};
    // answers.push(newAnswer);
  }

  let items = props.items.slice();
  if(items == false) {
    items = [seedItem];
  }
  items = items.map((item, index) => {
    return (
      <EditQuizItemView
        key={index}
        question={item.question}
        answers={item.answers}
        index={index}
        editQuizItem={editQuizItem}
        deleteAnswer={deleteAnswer}
        addAnswer={addAnswer}
      />
    );
  });

  console.log("items into render: ", items);
  return (
    <div>
      <EditQuizTitleView
        title={props.title}
        minimumScore={props.minimumScore}
        editQuizItem= {editQuizItem}
      />
    {items}
    </div>
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    quizSelectedId: state.quizReducer.quizSelectedId,
    items: state.quizReducer.quiz.items,
    title: state.quizReducer.quiz.title,
    minimumScore: state.quizReducer.quiz.minimumScore,
    courseId: state.authReducer.course._id,
    token: state.authReducer.token
  };
}
function mapDispatchToProps(dispatch) {
  return {
    createQuizViewToggle: () => dispatch(createQuizView()),
    addItem: (item) => dispatch(addItem(item)),
    createQuiz: (token, title, courseId, minScore) => dispatch(createQuiz(token, title, courseId, minScore)),
    editQuiz: (itemIndex, itemName, value, subIndex) => dispatch(editQuiz(itemIndex, itemName, value, subIndex))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuizItemsContainer);
