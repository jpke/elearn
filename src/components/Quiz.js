import React, {PropTypes, Component} from 'react';

export default class Quiz extends Component {
  static propTypes = {
    startQuiz: PropTypes.func.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired,
    prevQuestion: PropTypes.func.isRequired,
    question: PropTypes.string,
    answers: PropTypes.array,
    currentQuestionIndex: PropTypes.number
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let answers = this.props.question ?
      this.props.answers.map((answer, index) => {
          return <li key={index}>answer</li>;
      })
      : null;

      return (
        <div>
          <h2>Quiz</h2>
          {this.props.question ?
            <div>
              <h3>Question {this.props.currentQuestionIndex + 1}</h3>
              <p>{this.props.question}</p>
              <h3>Answers</h3>
              <ul>
                {answers}
              </ul>
              <button onClick={this.props.prevQuestion}>Previous Question</button>
              <button onClick={this.props.nextQuestion}>Next Question</button>
            </div>
          :
          <button onClick={this.props.startQuiz}>Start</button>
          }
        </div>
      );
  }
}
