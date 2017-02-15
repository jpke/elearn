import React from 'react'

export default function courseListCreator(items, selectFunction, passed) {
  return items.map((item, index) => {
    let q;
    let itemName = item.name || item.title;
    if(passed) {
      q = item.quizzes.map((quiz, idx) => {
        return passed.find((passedQuiz) => {
          return quiz._id === passedQuiz.of
        })
      })
      if(q.length === item.quizzes.length) {
        return <li key={index} onClick={() => selectFunction(item)}>{itemName}<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><g><path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path></g></svg></li>
      }
    }
    return <li key={index} onClick={() => selectFunction(item)}>{itemName}</li>
  })
};
