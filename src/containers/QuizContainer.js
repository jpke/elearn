import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import QuizView from '../components/QuizView';

//container for QuizView
//called when user has started quiz
//calculates current unanswered questions, sending result into QuizView
//sends quiz data, id, user id and jwt token to async action to submit quiz to server
export const QuizContainer = (props) => {
  //gets the length of the current quiz, subtracting for each question with an answer selected
  let unansweredQuestionCount = props.quizData.length;
  props.quizData.forEach(question => {
    if(question.idSelected != null) unansweredQuestionCount--
  });

  const submitQuiz = () => {
    props.actions.submitQuiz(props.quizData, props.quizId, props.user_id, props.token)
  }
  return (
      <QuizView
        selectAnswer={props.actions.selectAnswer}
        nextQuestion={props.actions.nextQuestion}
        prevQuestion={props.actions.prevQuestion}
        submitQuiz={submitQuiz}
        title={props.title}
        question={props.question}
        answers={props.answers}
        idSelected={props.idSelected}
        itemSelected={props.itemSelected}
        currentQuestionIndex={props.currentQuestionIndex}
        questionCount={props.questionCount}
        unansweredQuestions={unansweredQuestionCount}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
      title: state.quizReducer.quiz.title,
      question: state.quizReducer.currentQuestion.question,
      answers: state.quizReducer.currentQuestion.answers,
      idSelected: state.quizReducer.currentQuestion.idSelected,
      itemSelected: state.quizReducer.currentQuestion.itemSelected,
      currentQuestionIndex: state.quizReducer.currentQuestionIndex,
      questionCount: state.quizReducer.questionCount,
      quizId: state.quizReducer.quiz._id,
      quizData: state.quizReducer.quizData,
      user_id: state.authReducer.userId,
      token: state.authReducer.token,
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizContainer);
