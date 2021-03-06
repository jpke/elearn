import React from 'react'

//creates list of quizzes passed by user
//displays check mark icon by quizzes user has passed
export default function passedQuizList(quizzes, passed) {
  if(!quizzes) return <li />;
  let p;
  return quizzes.map((quiz, index) => {
    p = passed ? passed.filter((item) => {
      return item.of === quiz._id;
    }) : "";
    if(p.length > 0)return (<li key={index}>
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <g>
          <path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path>
        </g>
      </svg>
    </li>)
    return <li key={index} />
  })
}
