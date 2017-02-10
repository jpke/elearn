import React from 'react';

const EditQuizItemView = (props) => {
  console.log("edit quiz item view: ", props);

  let answers = props.answers.map((itemAnswer, idx) => {
    return (
      <div key={props.index + " answer " + idx} id={props.index + " answerDiv " + idx}>
        <input type="text" id={props.index + " answer " + idx} name="itemAnswer" className="edit-quiz-item" defaultValue={itemAnswer.answer} onChange={(e) => {props.editQuizItem(e)}}/>
        <input type="radio" id={props.index + " radio " + idx} className="answer-radio" defaultValue={itemAnswer.correct} onChange={(e) => {props.editQuizItem(e)}}/>
        <button id={props.index + " answerDiv " + idx} className="modify-answers" onClick={props.deleteAnswer}>Delete</button>
      </div>
    );
  });

  return (
    <div className="quizInProgress">
      <h3>Question</h3>
      <p>{props.question}</p>
      <h3 className="answers">Answers</h3>
      {answers}
      <button id={props.index + " question"} className="modify-answers" onClick={props.addAnswer}>Add Answer</button>
    </div>
  );
};

export default EditQuizItemView;
