import React from 'react';

const CreateQuizView = (props) => {
  let items;
  if(props.quiz) {
    items = props.quiz.map((item, index) => {
      return (
        <div key={index}>
          <input type="text" id={index}className="quizQuestion" value={item.question}/>
          {item.answers.map((answer, index) => {
            <div>
              <input type="text" id={index}className="quizAnswer" value={item.answer}/>
              <label><input type="checkbox" id={index + " checkbox"} value={item.correct}/>Correct</label>
            </div>
          })}
        </div>
      )
    });
  } else {
    console.log("creating items");
    let answers = [];
    for(let i = 0; i < 4; i++) {
      answers.push({answer: "enter answer here", correct: false});
    };
    items =
        <div>
          <input type="text" id={1}className="quizQuestion" placeholder="enter question here"/>
          {props.answerList(answers)}
        </div>
  };
  console.log("items: ", items);
  return (
    <div className="createNewQuiz">
      <h2>Create New Quiz</h2>
        <form onSubmit={props.createQuiz} id="newQuizForm">
          <label>Title</label>
          <input type="text" id="quizTitle" className="newQuiz" />
          <label>Minimum Passing Score</label>
          <input type="number" id="quizMinScore" className="newQuiz" />
          {items}
          <button className="newQuizButton" type="submit">Create Quiz</button>
        </form>
      <button onClick={props.createQuizViewToggle}>Quiz List</button>
    </div>
  )
};

export default CreateQuizView;
