import React from 'react';
import EditQuizQuestion from './EditQuizQuestion';
import {Link} from 'react-router';

const CreateQuizView = (props) => {
  console.log("props: ", props.quiz);
  let items;
  if(props.quiz) {
    console.log("no seed running")
    items = props.quiz.map((item, index) => {
      return (
        <EditQuizQuestion
          item={item}
          index={index}
        />
      )
    })
  } else {
    console.log("seed running")
    const seedItem = {
      question: "enter question here",
      answers: [
        {
          answer: "enter answer here",
          correct: false
        },
        {
          answer: "enter answer here",
          correct: false
        },
        {
          answer: "enter answer here",
          correct: false
        },
        {
          answer: "enter answer here",
          correct: false
        }
      ]
    };
    items = <EditQuizQuestion
              item={seedItem}
            />
  };
  return (
    <div className="createNewQuiz">
      <h2>Create New Quiz</h2>
        <form onSubmit={props.createQuiz} id="newQuizForm">
          <label>Title</label>
          <input type="text" id="quizTitle" name="title" className="newQuiz" value={props.title}/>
          <label>Minimum Passing Score</label>
          <input type="number" id="quizMinScore" name="minimumScore" className="newQuiz" value={props.minimumScore}/>
          <button className="newQuizButton" type="submit">Create Quiz</button>
        </form>
        <Link to="/quiz"><button>Quiz List</button></Link>
    </div>
  )
};

export default CreateQuizView;
