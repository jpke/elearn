import React from 'react';
import {Link} from 'react-router';

//view for QuizListContainer
//displays list of quizzes available in selected course
//if no course selected, listCreator returns list item reminding user to select a course
//displays a checkmark next to quizzes listed that user has passed
//offers option to create a new quiz is user is a course admin
const QuizListView = (props) => (
  <div>
    <h3>Select quiz</h3>
    <div className="quiz-list-container">
      <ul className="quiz-list">
        {props.listCreator(props.quizzes, props.selectQuiz, props.admin, props.editQuiz, props.passed)}
      </ul>
      <ul className="passed">
        {props.quizzes && props.passedQuizList(props.quizzes, props.passed)}
      </ul>
    </div>
    {props.admin && <Link to="/quiz/modify"><button className= "create-quiz" onClick={() => {props.editQuiz()}}>Create Quiz</button></Link>}
  </div>
);

export default QuizListView;
