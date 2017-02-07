import React, {Component} from 'react';

const QuizListView = (props) => (
  <div>
    <h2>Select quiz</h2>
    <ul className="quiz-list">
      {props.listCreator(props.quizzes, props.selectQuiz)}
    </ul>
  </div>
);

export default QuizListView;
