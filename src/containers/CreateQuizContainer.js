import React from 'react';
import {connect} from 'react-redux';
import {createQuizView, addItem} from '../actions/eLearnActions';
import CreateQuizView from '../components/CreateQuizView';

export const CreateQuizContainer = (props) => {
  console.log(props.newQuiz == true)
  const createQuiz = (event) => {
    event.preventDefault();
    const form = event.target.elements;
    props.createQuiz(form.quizTitle.value, props.courseId, form.quizMinScore.value);
  }
  return (
    <div>
      {props.newQuiz ?
      <p>add question</p>
      :
      <CreateQuizView
        createQuizViewToggle={props.createQuizViewToggle}
        newQuiz={props.newQuiz}
        addItem={props.addItem}
        createQuiz={createQuiz}
      />
      }
    </div>
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    newQuiz: state.quizReducer.newQuiz,
    courseId: state.authReducer.course._id
  };
}
function mapDispatchToProps(dispatch) {
  return {
    createQuizViewToggle: () => dispatch(createQuizView()),
    addItem: (item) => dispatch(addItem(item)),
    createQuiz: (newQuiz) => dispatch(createQuiz(newQuiz))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateQuizContainer);
