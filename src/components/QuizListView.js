import React from 'react';
import {Link} from 'react-router';

const QuizListView = (props) => (
  <div>
    <h2>Select quiz</h2>
    <ul className="quiz-list">
      {props.listCreator(props.quizzes, props.selectQuiz, props.admin, props.editQuiz)}
    </ul>
    {props.admin && <button onClick={() => {props.editQuiz()}}>Create Quiz</button>}
  </div>
);

export default QuizListView;
