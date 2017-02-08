import React from 'react';

const CreateQuizView = (props) => (
  <div className="createNewQuiz">
    <h2>Create New Quiz</h2>
      <form onSubmit={props.creatQuiz} id="newQuizForm">
        <label>Title</label>
        <input type="text" id="quizTitle" className="newQuiz" />
        <label>Minimum Passing Score</label>
        <input type="number" id="quizMinScore" className="newQuiz" />
        <button className="newQuizButton" type="submit">Create Quiz</button>
      </form>
    <button onClick={props.createQuizViewToggle}>Quiz List</button>
  </div>
);

export default CreateQuizView;
