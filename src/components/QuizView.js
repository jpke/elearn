import React from 'react';
import ListItems from './ListItems';

const QuizView = (props) => (
  <div className="quizInProgress">
    <h3>Question {props.currentQuestionIndex + 1}</h3>
    <p>{props.question}</p>
    <h3 className="answers">Answers</h3>
    <ul className="item-list">
      <ListItems
        idSelected={props.idSelected}
        itemSelected={props.itemSelected}
        answers={props.answers}
        selectAnswer={props.selectAnswer}/>
    </ul>
    <div className="quizNav-buttons">
      {props.currentQuestionIndex != props.questionCount - 1 ?
        <button onClick={props.nextQuestion}>Next Question</button>
        :
        <button onClick={props.submitQuiz}>Submit Quiz</button>
      }
      {props.currentQuestionIndex > 0 &&
          <button onClick={props.prevQuestion}>Previous Question</button>
      }
    </div>
    {props.currentQuestionIndex === props.questionCount - 1 &&
      <p className="unansweredCount">Unanswered Questions:  <span>{props.unansweredQuestions}</span></p>
    }
  </div>
);

export default QuizView;
