import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import QuizView from '../components/QuizView';

export const QuizViewContainer = (props) => {
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
        quizId={props.quizId}
        quizData={props.quizData}
        user_id={props.user_id}
        token={props.token}

      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
      title: state.quizReducer.quiz.title,
      question: state.quizReducer.currentQuestion.question || "",
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
)(QuizViewContainer);
