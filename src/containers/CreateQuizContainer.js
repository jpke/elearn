import React from 'react';
import {connect} from 'react-redux';
import {createQuizView, createQuiz, addItem} from '../actions/eLearnActions';
import EditQuizView from '../components/EditQuizView';
import CreateQuizView from '../components/CreateQuizView';

export const CreateQuizContainer = (props) => {
  const createQuiz = (event) => {
    event.preventDefault();
    const form = event.target.elements;
    let quiz = {};
    console.log("title: ", form.title.value);
    quiz.title = form.title.value;
    quiz.minimumScore = form.minimumScore.value;
    quiz.items = [];
    let item = {};
    item.question = form.question.value;
    item.answers = [];
    for(let i = 0; i < form.quizAnswer; i++) {
      item.answers[i] = form.quizAnswer[i].value
    };
    quiz.items.push(item);
    console.log("quiz: ", quiz);
    // quiz.items.push({question: form[2].value})
    console.log('form quizanswer', form.quizAnswer);
    // props.createQuiz(props.token, form.quizTitle.value, props.courseId, form.quizMinScore.value);
  }

  return (
    <CreateQuizView
      createQuizViewToggle={props.createQuizViewToggle}
      newQuiz={props.newQuiz}
      addItem={props.addItem}
      createQuiz={createQuiz.bind(this)}
    />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    newQuiz: state.quizReducer.newQuiz,
    courseId: state.authReducer.course._id,
    token: state.authReducer.token
  };
}
function mapDispatchToProps(dispatch) {
  return {
    createQuizViewToggle: () => dispatch(createQuizView()),
    addItem: (item) => dispatch(addItem(item)),
    createQuiz: (token, title, courseId, minScore) => dispatch(createQuiz(token, title, courseId, minScore))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateQuizContainer);
