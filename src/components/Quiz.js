import React, {PropTypes, Component} from 'react';

export default class Quiz extends Component {
  static propTypes = {
    startQuiz: PropTypes.func.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired,
    prevQuestion: PropTypes.func.isRequired,
    submitQuiz: PropTypes.func.isRequired,
    question: PropTypes.string,
    answers: PropTypes.array,
    currentQuestionIndex: PropTypes.number
  }

  constructor(props, context) {
    super(props, context);
  }

  selectAnswer(event) {
    this.props.selectAnswer(event.target.textContent);
  }

  render() {
    let answers = this.props.question ?
      this.props.answers.map((answer, index) => {
          return (<li key={index} onClick={this.selectAnswer.bind(this)}>{answer}</li>);
      })
      : null;

      return (
        <div>
          <h2>Quiz</h2>
          <h3>Score {this.props.score}</h3>
          {this.props.question ?
            <div>
              <h3>Question {this.props.currentQuestionIndex + 1}</h3>
              <p>{this.props.question}</p>
              <h3>Answers</h3>
              <ul>
                {answers}
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
          <button onClick={this.props.startQuiz}>Start</button>
          }
        </div>
      );
  }
}
