import React from 'react';
import ListItems from './ListItems';

export const QuizView = (props) => (
  <div className="quizInProgress">
    <h3>Question {props.currentQuestionIndex + 1}</h3>
    <p>{props.question}</p>
    <h3>Answers</h3>
    <ul>
      <ListItems
        idSelected={props.idSelected}
        itemSelected={props.itemSelected}
        answers={props.answers}
        selectAnswer={props.selectAnswer}/>
    </ul>
    {props.currentQuestionIndex > 0 &&
        <button onClick={props.prevQuestion}>Previous Question</button>
    }
    {props.currentQuestionIndex != props.questionCount - 1 ? (
        <button onClick={props.nextQuestion}>Next Question</button>
      ) : (
        <div>
          <button onClick={props.submitQuiz}>Submit Quiz</button>
          <p>Unanswered Questions {props.unansweredQuestions}</p>
        </div>
      )
    }
  </div>
);
