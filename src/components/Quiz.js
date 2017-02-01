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
  submitClick() {
    this.props.submitQuiz(this.props.quizData, this.props.quizTitle, this.props.quizId, this.props._id, this.props.token)
  }
  startQuiz() {
    this.props.startQuiz(this.props.token);
  }
  render() {
    console.log("quiz props: ", this.props);
      return (
        <div className="quizContainer">
          <h2>Quiz</h2>
          {this.props.quizInProgress ?
            <div className="quizInProgress">
              <h3>Question {this.props.currentQuestionIndex + 1}</h3>
              <p>{this.props.question}</p>
              <h3>Answers</h3>
              <ul>
                <ListItems
                  idSelected={this.props.idSelected}
                  answers={this.props.answers}
                  selectAnswer={this.props.selectAnswer}/>
              </ul>
              {this.props.currentQuestionIndex > 0 ?
                <button onClick={this.props.prevQuestion}>Previous Question</button> :
                  ""
              }
              {this.props.currentQuestionIndex != this.props.questionCount - 1 ?
              <button onClick={this.props.nextQuestion}>Next Question</button> :
              <div>
                <button onClick={this.submitClick.bind(this)}>Submit Quiz</button>
                <p>Unanswered Questions</p>
              </div>
              }

            </div>
          :
          <QuizLanding
            startQuiz={this.startQuiz.bind(this)}
            passed={this.props.passed}
            score={this.props.score}
            attempts={this.props.attempts}
          />
          }
        </div>
      );
  }
}
