import React from 'react';

const QuizListView = (props) => (
  <div>
    <h2>Select quiz</h2>
    <ul className="quiz-list">
      {props.listCreator(props.quizzes, props.selectQuiz)}
    </ul>
    {props.admin && <button onClick={props.createQuizViewToggle}>Create Quiz</button>}
  </div>
);

export default QuizListView;
