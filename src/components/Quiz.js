import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import listCreator from '../utils/listCreator'
import ListItems from './ListItems';
import QuizViewContainer from '../containers/QuizViewContainer'
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
    this.props.startQuiz(this.props.token, this.props.quizSelected._id);
  }
  render() {
    console.log("quiz props ", this.props.course);
    let quizzes;
    if(this.props.course) {
      quizzes = listCreator(this.props.course.quizzes, this.props.selectQuiz);
      console.log("quizzes: ", quizzes);
    }
      return (
        <div className="quizContainer">
          <h2>Quiz</h2>
          {this.props.token ? (
            this.props.quizInProgress ?
              <QuizViewContainer />
             :
             this.props.quizSelected ?
              <QuizLanding
                startQuiz={this.startQuiz.bind(this)}
                passed={this.props.passed}
                score={this.props.score}
                attempts={this.props.attempts}
              />
            :
            <div>
            {quizzes}
            </div>
          ) : (
            <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>
          )}
        </div>
      );
  }
}
