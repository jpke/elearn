import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createQuizView, createQuiz, addItem, editQuiz} from '../actions/eLearnActions';
import EditQuizItemView from '../components/EditQuizItemView';
import EditQuizTitleView from '../components/EditQuizTitleView';
import seedItem from '../utils/seedItem';

export const EditQuizItemsContainer = (props) => {
  console.log("edit items cont ", props);

  const editQuizItem = (event) => {
    event.preventDefault();
    const target = event.target.id.split(" ");
    const itemIndex = target[0];
    const itemName = target[1];
    const value = event.target.value;
    const subIndex = target[2];
    console.log("value: ", value);
    props.editQuiz(itemIndex, itemName, value, subIndex)
  };

  const deleteQuiz = () => {
    let result = confirm("Confirm to delete quiz. This cannot be undone.")
    console.log("confirmed? ", result);
    if(result) props.editQuiz(0, "deleteQuiz");
  }

  const saveQuiz = () => {
    console.log("saved quiz");
  }

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("event: ", e.target.elements);
    deleteQuiz();
  }

  let items = props.items.map((item, index) => {
    return (
      <EditQuizItemView
        key={index}
        question={item.question}
        answers={item.answers}
        index={index}
        editQuizItem={editQuizItem}
      />
    );
  });

  console.log("items into render: ", items);
  return (
    <div className="editQuiz-container">
      <EditQuizTitleView
        title={props.title}
        minimumScore={props.minimumScore}
        editQuizItem= {editQuizItem}
        saveQuiz={saveQuiz}
        deleteQuiz={deleteQuiz}
      />
      {items}
      <div className="addItem">
        <button id="0 addItem" name="0 addItem" className="addItem-button" onClick={editQuizItem}>Add Question</button>
      </div>
    </div>
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
    quizSelectedId: state.quizReducer.quizSelectedId,
    items: state.quizReducer.quiz.items,
    title: state.quizReducer.quiz.title,
    minimumScore: state.quizReducer.quiz.minimumScore,
    courseId: state.authReducer.course._id,
    token: state.authReducer.token
  };
}
function mapDispatchToProps(dispatch) {
  return {
    createQuizViewToggle: () => dispatch(createQuizView()),
    addItem: (item) => dispatch(addItem(item)),
    createQuiz: (token, title, courseId, minScore) => dispatch(createQuiz(token, title, courseId, minScore)),
    editQuiz: (itemIndex, itemName, value, subIndex) => dispatch(editQuiz(itemIndex, itemName, value, subIndex))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuizItemsContainer);

// class EditQuizItemsContainer extends Component {
//   constructor(props) {
//     super(props)
//     // let items = props.items.slice();
//     // if(items == false) {
//     //   items = [seedItem];
//     // }
//   //   this.state = {
//   //     correct: this.props.items.map((item, index) => {
//   //         return item.answers.map((answer, idx) => {
//   //           let id = index + " " + idx;
//   //           return {id: id, correct: answer.correct};
//   //         })
//   //       })
//   //     ,
//   //     items: items.map((item, index) => {
//   //     return (
//   //       <EditQuizItemView
//   //         key={index}
//   //         question={item.question}
//   //         answers={item.answers}
//   //         index={index}
//   //         editQuizItem={this.editQuizItem.bind(this)}
//   //         deleteAnswer={this.deleteAnswer.bind(this)}
//   //         addAnswer={this.addAnswer.bind(this)}
//   //       />
//   //     );
//   //   });
//   // }
//   }
//   componentWillReceiveProps(nextProps) {
//       console.log("edit items cont ", props);
//     nextProps.items.forEach((item, index) => {
//       item.answers.forEach((answer, idx) => {
//         if(answer.correct != this.props.items[index].answers[idx].correct) {
//           let id = index + " " + idx;
//           this.setState({
//             state: state.slice(0,index).concat({id: id, correct: answer.correct}).slice(index + 1, state.length)
//           });
//         }
//       })
//     })
//   }
//
//   editQuizItem(event) {
//     event.preventDefault();
//     console.log("target: ", event.target);
//     const target = event.target.id.split(" ");
//     const itemIndex = target[0];
//     const itemName = target[1];
//     const value = event.target.value;
//     const subIndex = target[2];
//     console.log("value: ", value);
//     props.editQuiz(itemIndex, itemName, value, subIndex)
//
//
//   };
//
//   deleteAnswer(event) {
//     console.log(event.target);
//     // answers = answers.slice(0,answerIndex).concat(answers.slice(answerIndex+1,answers.length));
//   };
//
//   addAnswer(event) {
//     console.log(event.target);
//     const newAnswer = {answer: "Add answer here", correct: false};
//     // answers.push(newAnswer);
//   }
//   render() {
//     return (
//       <div>
//         <EditQuizTitleView
//           title={props.title}
//           minimumScore={props.minimumScore}
//           editQuizItem= {this.editQuizItem.bind(this)}
//         />
//       {items}
//       </div>
//     );
//   }
// };
//
// // QuizPage.propTypes
//
// function mapStateToProps(state) {
//   return {
//     quizSelectedId: state.quizReducer.quizSelectedId,
//     items: state.quizReducer.quiz.items,
//     title: state.quizReducer.quiz.title,
//     minimumScore: state.quizReducer.quiz.minimumScore,
//     courseId: state.authReducer.course._id,
//     token: state.authReducer.token
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     createQuizViewToggle: () => dispatch(createQuizView()),
//     addItem: (item) => dispatch(addItem(item)),
//     createQuiz: (token, title, courseId, minScore) => dispatch(createQuiz(token, title, courseId, minScore)),
//     editQuiz: (itemIndex, itemName, value, subIndex) => dispatch(editQuiz(itemIndex, itemName, value, subIndex))
//   };
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EditQuizItemsContainer);
