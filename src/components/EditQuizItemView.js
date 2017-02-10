import React from 'react';

const EditQuizItemView = (props) => {

  let answers = props.answers.map((itemAnswer, idx) => {
    console.log("item props: ",idx, itemAnswer.correct == true);
    return (
      <div key={props.index + " answer " + idx} id={props.index + " answerDiv " + idx}>
        <input type="text" id={props.index + " answer " + idx} name="itemAnswer" className="edit-quiz-item" defaultValue={itemAnswer.answer} onChange={(e) => {props.editQuizItem(e)}}/>
        <div className="editQuiz-answer-button">
          <button id={props.index + " answerDiv " + idx} className="modify-answers" onClick={props.deleteAnswer}>Delete</button>
          <button id={props.index + " answerCorrect " + idx} className="modify-answers" onClick={(e) => {props.editQuizItem(e)}}>{itemAnswer.correct ? "True" : "False"}</button>
        </div>
      </div>
    );
  });

  return (
    <div className="quizInProgress">
      <h3>Question</h3>
      <input type="text" id={props.index + " question"} name="itemQuestion" className="edit-quiz-item" defaultValue={props.question} onChange={(e) => {props.editQuizItem(e)}}/>
      <h3 className="answers">Answers</h3>
      {answers}
      <button id={props.index + " question"} className="modify-answers" onClick={props.addAnswer}>Add Answer</button>
    </div>
  );
};

export default EditQuizItemView;
