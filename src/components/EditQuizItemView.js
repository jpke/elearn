import React from 'react';

//view called by EditQuizContainer
//called for each quiz item
//creates a panel to edit quiz item data
//displays question and answer choices in editable input elements
//allows user to select one answer choice as correct
//allows user to add and delete answer choices
//allows user to delete entire quiz item
const EditQuizItemView = (props) => {
  //iterates through answer choices
  //creates editable input element
  //creates button indicating if answer is true or false
  //creates button to delete answer choice
  let answers = props.answers.map((itemAnswer, idx) => {
    return (
      <div key={props.index + " answer " + idx} id={props.index + " answerDiv " + idx} className="answer-container">
        <textarea type="text" id={props.index + " answer " + idx} name="itemAnswer" className="edit-quiz-item" value={itemAnswer.answer} onChange={(e) => {props.editQuizItem(e)}}/>
        <div className="buttons-container">
          <button id={props.index + " answerCorrect " + idx} className="modify-answers" onClick={(e) => {props.editQuizItem(e)}}>{itemAnswer.correct ? "True" : "False"}</button>
          <button id={props.index + " deleteAnswer " + idx} className="modify-answers" onClick={(e) => {props.editQuizItem(e)}}>Delete</button>
        </div>
      </div>
    );
  });

  return (
    <div className="editQuiz-item">
      <h3>Question</h3>
      <div className="question-container">
        <textarea type="text" id={props.index + " question"} name="itemQuestion" className="edit-question" value={props.question} onChange={(e) => {props.editQuizItem(e)}}/>
      </div>
      <h3 className="answers">Answers</h3>
      {answers}
      <div className="item-buttons">
      <button id={props.index + " addAnswer"} className="modify-answers" onClick={props.editQuizItem}>Add Answer</button>
      <button id={props.index + " deleteItem"} className="modify-answers" onClick={props.editQuizItem}>Delete Question</button>
      </div>
    </div>
  );
};

export default EditQuizItemView;
