import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createQuizView, createQuiz, addItem, editQuiz, deleteSavedQuiz} from '../actions/eLearnActions';
import EditQuizItemView from '../components/EditQuizItemView';
import EditQuizTitleView from '../components/EditQuizTitleView';
import seedItem from '../utils/seedItem';

export const EditQuizItemsContainer = (props) => {
  console.log("edit items cont ", props);

  const editQuizItem = (event) => {
    event.preventDefault();
    const target = event.target.id.split(" ");
    const itemIndex = target[0];
    const itemName = target[1];
    const value = event.target.value;
    const subIndex = target[2];
    console.log("value: ", value);
    props.editQuiz(itemIndex, itemName, value, subIndex)
  };

  const deleteQuiz = () => {
    let result = confirm("Confirm to delete quiz. This cannot be undone.")
    console.log("confirmed? ", result);
    if(result) {
      if(props.quizSelectedId) {
        props.deleteSavedQuiz(props.token, props.userId, props.courseId, props.quizSelectedId)
      } else props.editQuiz(0, "deleteQuiz");
    }
  }

  const saveQuiz = () => {
    console.log("saved quiz");
  }

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("event: ", e.target.elements);
    deleteQuiz();
  }

  let items = props.items.map((item, index) => {
    return (
      <EditQuizItemView
        key={index}
        question={item.question}
        answers={item.answers}
        index={index}
        editQuizItem={editQuizItem}
      />
    );
  });

  console.log("items into render: ", items);
  return (
    <div className="editQuiz-container">
      <EditQuizTitleView
        title={props.title}
        minimumScore={props.minimumScore}
        editQuizItem= {editQuizItem}
        saveQuiz={saveQuiz}
        deleteQuiz={deleteQuiz}
      />
      {items}
      <div className="addItem">
        <button id="0 addItem" name="0 addItem" className="addItem-button" onClick={editQuizItem}>Add Question</button>
      </div>
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
    token: state.authReducer.token,
    userId: state.authReducer._id

  };
}
function mapDispatchToProps(dispatch) {
  return {
    editQuiz: (itemIndex, itemName, value, subIndex) => dispatch(editQuiz(itemIndex, itemName, value, subIndex)),
    deleteSavedQuiz: (token, userId, courseId, quizId) => dispatch(deleteSavedQuiz(token, userId, courseId, quizId))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuizItemsContainer);
