import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import ListItems from './ListItems';

export default class QuizView extends Component {
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
  render() {
    console.log("quizView props ", this.props);
    // let unansweredQuestions = this.props.quizData.length;
    // this.props.quizData.forEach(question => {
    //   if(question.idSelected != null) unansweredQuestions--
    // });
    // console.log("count: ", unansweredQuestions);
      return (
        <div className="quizInProgress">
          <h3>Question {this.props.currentQuestionIndex + 1}</h3>
          <p>{this.props.question}</p>
          <h3>Answers</h3>
          <ul>
            <ListItems
              idSelected={this.props.idSelected}
              itemSelected={this.props.itemSelected}
              answers={this.props.answers}
              selectAnswer={this.props.selectAnswer}/>
          </ul>
          {this.props.currentQuestionIndex > 0 &&
              <button onClick={this.props.prevQuestion}>Previous Question</button>
          }
          {this.props.currentQuestionIndex != this.props.questionCount - 1 ? (
              <button onClick={this.props.nextQuestion}>Next Question</button>
            ) : (
              <div>
                <button onClick={this.submitClick.bind(this)}>Submit Quiz</button>
                <p>Unanswered Questions</p>
              </div>
            )
          }
        </div>
      )
    }
}
