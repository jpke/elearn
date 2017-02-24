import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {toggleQuizView, editQuiz, deleteSavedQuiz, saveQuiz} from '../actions/eLearnActions';
import EditQuizItemView from '../components/EditQuizItemView';
import EditQuizTitleView from '../components/EditQuizTitleView';

//container for EditQuizItemView and EditQuizTitleView
  //could separte this into non html container and a html containing EditQuizView component
//creates a view displaying all quiz content in editable input elements
//displays message near top when quiz update successful
//editQuizItem called whenever an input element is changed, maps change to redux store
//deleteQuiz called to delete displayed quiz
//saveQuiz called to update or create displayed quiz
export const EditQuizContainer = (props) => {
  //called whenever an input element value changes
  //formats input element id into separate variables, which will be used to save updated value into proper leaf in redux store (see quizReducer case for types.UPDATE_QUIZ)
  //calls editQuiz action with input element value and formatted id
  const editQuizItem = (event) => {
    event.preventDefault();
    const target = event.target.id.split(" ");
    const itemIndex = target[0];
    const itemName = target[1];
    const value = event.target.value;
    const subIndex = target[2];
    props.editQuiz(itemIndex, itemName, value, subIndex)
  };
  //called to delete quiz
  //creates alert prompting user to confirm intention to delete quiz
  //if quiz is newly created (not pulled from server) quiz data just deleted from redux store by calling editQuiz action
  //if quiz was pulled from server, calls deleteSavedQuiz action with user token and id, course id, and quiz id to create async request for server to delete quiz from database
  const deleteQuiz = () => {
    //quiz is not deleted if user fails to confirm at prompt
    let result = confirm("Confirm to delete quiz. This cannot be undone.")
    if(result) {
      if(props.quizSelectedId) {
        props.deleteSavedQuiz(props.token, props.userId, props.courseId, props.quizSelectedId)
      } else props.editQuiz(0, "deleteQuiz");
    }
  }
  //saves quiz
  //calls savequiz action, passing user token, id and course id and quiz data for async request for server to save quiz to database
  const saveQuiz = () => {
    props.saveQuiz(props.token, props.userId, props.courseId, props.quiz)
  }
  //iterates through quiz items (questions with answer choices) calling EditQuizItemView on each
  //results in an editable set of input elements for each quiz item
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
          <button id="toggleQuizView" className="toggleQuizView" onClick={browserHistory.goBack}>Back to Quizzes
          </button>
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
)(EditQuizContainer);
