import React, {Component} from 'react';

const QuizLanding = (props) => (
      <div>
        {props.attempts ?
          <div>
            <h3>You have attempted this quiz {
                props.attempts.length > 1 ?
                  props.attempts.length.toString().concat(" times")
                  :
                  props.attempts.length.toString().concat(" time")
                }
            </h3>
            <h4>Your best score was {Math.max(...props.attempts)}</h4>
            <h3>You have {props.passed ? "" : "not"} passed this quiz</h3>
          </div>
          :
          <h3>You have not yet attempted this quiz</h3>
        }
        <button onClick={props.startQuiz}> Start Quiz </button>
      </div>
);

export default QuizLanding;
