import React from 'react';
import highScore from '../utils/highScore';

//displays page allowing user to start quiz
//also displays number of prior attempts at quiz by user
//also displays best score achieved on quiz by user
//offers option to toggle view to list to available quizzes
const QuizStartView = (props) => (
      <div className="quiz-start">
        {props.attempts.length ? (
          <div>
            <h2>{props.title}</h2>
            <h4>Last score: {props.attempts[props.attempts.length - 1].score}</h4>
            <h4>Best score: {highScore(props.attempts)}</h4>
            <h4>Attempts: {props.attempts.length}</h4>
            <h3>You have {props.passed ? "" : "not"} passed this quiz</h3>
          </div>
        ):(
          <h3>You have not yet attempted this quiz</h3>
        )
      }
      <div className="quiz-start-button-container">
        <button className="quiz-start-button" onClick={props.startQuiz}> Start Quiz </button>
        <button className="quiz-start-button" onClick={props.viewQuizzes}>Back to Quiz List</button>
      </div>
    </div>
);

export default QuizStartView;
