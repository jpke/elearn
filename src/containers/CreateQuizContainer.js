import React from 'react';
import {connect} from 'react-redux';
import {createQuizView, createQuiz, addItem} from '../actions/eLearnActions';
import EditQuizView from '../components/EditQuizView';
import CreateQuizView from '../components/CreateQuizView';

export const CreateQuizContainer = (props) => {
  const createQuiz = (event) => {
    event.preventDefault();
    const form = event.target.elements;
    console.log('form ', form.quizMinScore.value);
    props.createQuiz(props.token, form.quizTitle.value, props.courseId, form.quizMinScore.value);
  }

  const answerList = (answers) => {
    console.log("answers: ", answers);
    let answerList = [];
    for(let i in answers) {
      answerList.push(
        <div key={i}>
          <input type="text" id={i} className="quizAnswer" placeholder={answers[i].answer}/>
          <label>
            <input type="radio" id={i + " radio"} name="quizAnswerCorrect" value={i}/>Correct
          </label>
        </div>
      );
    }
    console.log("answerlist: ", answerList);
    return answerList;
  }

  return (
    <CreateQuizView
      createQuizViewToggle={props.createQuizViewToggle}
      newQuiz={props.newQuiz}
      addItem={props.addItem}
      createQuiz={createQuiz.bind(this)}
      answerList={answerList.bind(this)}
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
