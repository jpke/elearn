import React from 'react'
import {Link} from 'react-router'

//creates list of quizzes available to user
//if no quizzes passed in, will return a reminder to select a course
//if admin, displays option to edit quiz
const QuizListCreator = (items, selectFunction, admin, editQuiz) => {
  if(!items) return <li>No quizzes listed <br /> Have you selected a course?</li>;
  if(admin) {
    return items.map((item, index) => {
      let itemName = item.name || item.title;
      return (
        <li key={index} className="listed-item" onClick={() => selectFunction(item)}>
          <div>{itemName}</div>
          <Link to="/quiz/modify"><button onClick={() => {editQuiz("modify")}}>Edit</button></Link>
        </li>
        )
    })
  }
  return items.map((item, index) => {
    let itemName = item.name || item.title;
    return <li key={index} onClick={() => selectFunction(item)}>{itemName}</li>
  })
}

export default QuizListCreator;
