import React from 'react';
import highScore from '../utils/highScore';

const QuizStartView = (props) => (
      <div>
        {props.attempts.length ? (
          <div>
            <h3>You have attempted this quiz {
                props.attempts.length === 1 ?
                  props.attempts.length.toString().concat(" time")
                  :
                  props.attempts.length.toString().concat(" times")
                }
            </h3>
            <h4>Your best score was {highScore(props.attempts)}</h4>
            <h3>You have {props.passed ? "" : "not"} passed this quiz</h3>
          </div>
        ):(
          <h3>You have not yet attempted this quiz</h3>
        )
      }
      <div>
        <button onClick={props.startQuiz}> Start Quiz </button>
        <button onClick={props.viewQuizzes}>Back to Quiz List</button>
      </div>
    </div>
);

export default QuizStartView;
