import React from 'react'
import {Link} from 'react-router'

export default function listCreator(items, selectFunction, admin, editQuiz) {
  if(!items) return <li>No Quizzes</li>;
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
