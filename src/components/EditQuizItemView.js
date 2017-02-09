import React from 'react';
import ListItems from './ListItems';

const EditQuizItemView = (props) => {

  let answers = props.answers.map((itemAnswer, idx) => {
    return (<div key={idx}>
              <input type="text" id={idx} name="itemAnswer" className="edit-quiz-item" value={itemAnswer.answer}/>
              <input type="radio" id={idx + "radio"} className="answer-radio" value={itemAnswer.correct} />
              <button className="deleteAnswer" onClick={(idx) => deleteAnswer.bind(this)}>Delete</button>
            </div>
    );
  });

  const deleteAnswer = (answerIndex) => {
    answers = answers.slice(0,answerIndex).concat(answers.slice(answerIndex+1,answers.length));
  };

  const addAnswer = (event) => {
    event.preventDefault();
    const newAnswer = {answer: "Add answer here", correct: false};
    answers.push(newAnswer);
  }

  return (
    <div className="quizInProgress">
      <h3>Question</h3>
      <p>{props.question}</p>
      <h3 className="answers">Answers</h3>
      <form onSubmit={props.editQuizItem} id="newQuizForm">
        {answers}
        <button className="addAnswer" onClick={addAnswer.bind(this)}>Add Answer</button>
        <button className="newQuizButton" type="submit">Update Question</button>
      </form>
    </div>
  );
};

export default EditQuizItemView;
