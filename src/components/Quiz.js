import React, {PropTypes, Component} from 'react';

export default class Quiz extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let answers = this.props.answers.map(answer => {
      return <li>answer</li>
    });
    return (
      <div>
        <h2>Quiz</h2>
        <h3>Question {this.props.currentQuestionIndex}</h3>
        <p>{this.props.question}</p>
        <h3>Answers</h3>
        <ul>
          {this.answers}
        </ul>
      </div>
    );
  }
}
