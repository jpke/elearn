import React from 'react';
import {Link} from 'react-router';

const QuizListView = (props) => (
  <div>
    <h3>Select quiz</h3>
    <div className="quiz-list-container">
      <ul className="quiz-list">
        {props.quizzes && props.listCreator(props.quizzes, props.selectQuiz, props.admin, props.editQuiz, props.passed)}
      </ul>
      <ul className="passed">
        {props.quizzes && props.passedList(props.quizzes, props.passed)}
      </ul>
    </div>
    {props.admin && <Link to="/quiz/modify"><button className= "create-quiz" onClick={() => {props.editQuiz()}}>Create Quiz</button></Link>}
  </div>
);

export default QuizListView;
