import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {toggleQuizView, editQuiz, deleteSavedQuiz, saveQuiz} from '../actions/eLearnActions';
import EditQuizItemView from '../components/EditQuizItemView';
import EditQuizTitleView from '../components/EditQuizTitleView';

export const EditQuizItemsContainer = (props) => {

  const editQuizItem = (event) => {
    event.preventDefault();
    const target = event.target.id.split(" ");
    const itemIndex = target[0];
    const itemName = target[1];
    const value = event.target.value;
    const subIndex = target[2];
    props.editQuiz(itemIndex, itemName, value, subIndex)
  };

  const deleteQuiz = () => {
    let result = confirm("Confirm to delete quiz. This cannot be undone.")
    if(result) {
      if(props.quizSelectedId) {
        props.deleteSavedQuiz(props.token, props.userId, props.courseId, props.quizSelectedId)
      } else props.editQuiz(0, "deleteQuiz");
    }
  }

  const saveQuiz = () => {
    props.saveQuiz(props.token, props.userId, props.courseId, props.quiz)
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

  return (
    <div className="editQuiz-container">
      <div className="backToQuizList">
        <div>
        </div>
        <Link to="/quiz" >
          <button id="toggleQuizView" className="toggleQuizView">Back to Quizzes
          </button>
        </Link>
        <div>
          <h3>{props.message}</h3>
        </div>
      </div>
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
    quiz: state.quizReducer.quiz,
    quizSelectedId: state.quizReducer.quiz._id,
    items: state.quizReducer.quiz.items,
    title: state.quizReducer.quiz.title,
    minimumScore: state.quizReducer.quiz.minimumScore,
    courseId: state.authReducer.course._id,
    token: state.authReducer.token,
    userId: state.authReducer._id,
    message: state.quizReducer.message

  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleQuizView: () => dispatch(toggleQuizView()),
    editQuiz: (itemIndex, itemName, value, subIndex) => dispatch(editQuiz(itemIndex, itemName, value, subIndex)),
    deleteSavedQuiz: (token, userId, courseId, quizId) => dispatch(deleteSavedQuiz(token, userId, courseId, quizId)),
    saveQuiz: (token, userId, courseId, quiz) => dispatch(saveQuiz(token, userId, courseId, quiz))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuizItemsContainer);
