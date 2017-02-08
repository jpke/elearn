import React from 'react';

const EditQuizView = (props) => {
  console.log("edit props: ", props);
  return (
    <div className="editQuizContainer">
      <h3 className="title">Edit Quiz</h3>
      <form onSubmit={props.editQuiz} id="editQuizForm">
        <input type="text" id="title" className="edit" value={props.quiz.title} />
        <input type="number" id="quizMinScore" className="edit" value={props.quiz.minimumScore} />
        <button className="authButton" type="submit">Update</button>
      </form>
    </div>
  )
};

export default EditQuizView;
