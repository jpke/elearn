import React, {PropTypes, Component} from 'react';
import ListItems from './ListItems';
import QuizLanding from './QuizLanding';

export default class Quiz extends Component {
  static propTypes = {
    startQuiz: PropTypes.func.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired,
    prevQuestion: PropTypes.func.isRequired,
    submitQuiz: PropTypes.func.isRequired,
    question: PropTypes.string,
    answers: PropTypes.array,
    currentQuestionIndex: PropTypes.number,
    passed: PropTypes.bool
  }

  constructor(props, context) {
    super(props, context);
  }

  selectAnswer(event) {
    console.log("event.target: ", event.target.id);
    this.props.selectAnswer(event.target.textContent);
  }

  render() {
    // let answers = this.props.question ?
    //   this.props.answers.map((answer, index) => {
    //       // return (<li className="answerChoice" key={index} id={index} onClick={this.selectAnswer.bind(this)}>{answer}</li>);
    //       return (
    //         <ListItem index={index} key={index} selectAnswer={this.selectAnswer} answer={answer} />
    //         );
    //   })
    //   : null;

      return (
        <div>
          <h2>Quiz</h2>
          {this.props.quizInProgress ?
            <div>
              <h3>Question {this.props.currentQuestionIndex + 1}</h3>
              <p>{this.props.question}</p>
              <h3>Answers</h3>
              <ul>
                <ListItems answers={this.props.answers} selectAnswer={this.props.selectAnswer} />
              </ul>
              {this.props.currentQuestionIndex > 0 ?
                <button onClick={this.props.prevQuestion}>Previous Question</button> :
                  ""
              }
              {this.props.currentQuestionIndex != this.props.questionCount - 1 ?
              <button onClick={this.props.nextQuestion}>Next Question</button> :
              <button onClick={this.props.submitQuiz}>Submit Quiz</button>}

            </div>
          :
          <QuizLanding
            startQuiz={this.props.startQuiz}
            passed={this.props.passed}
            score={this.props.score}
            attempts={this.props.attempts}
          />
          }
        </div>
      );
  }
}
