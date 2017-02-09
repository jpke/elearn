import React from 'react';
import {Link} from 'react-router';

const QuizListView = (props) => (
  <div>
    <h2>Select quiz</h2>
    <ul className="quiz-list">
      {props.listCreator(props.quizzes, props.selectQuiz, props.admin)}
    </ul>
    {props.admin && <Link to="/quiz/modify"><button>Create Quiz</button></Link>}
  </div>
);

export default QuizListView;
