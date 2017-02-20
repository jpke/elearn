import React from 'react';

const QuizListView = (props) => (
  <div>
    <h3>Select quiz</h3>
    <div className="quiz-list-container">
      <ul className="quiz-list">
        {props.listCreator(props.quizzes, props.selectQuiz, props.admin, props.editQuiz, props.passed)}
      </ul>
      <ul className="passed">
        {props.passedList(props.quizzes, props.passed)}
      </ul>
    </div>
    {props.admin && <button className= "create-quiz" onClick={() => {props.editQuiz()}}>Create Quiz</button>}
  </div>
);

export default QuizListView;
