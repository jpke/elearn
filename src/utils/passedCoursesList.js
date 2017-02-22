import React from 'react'

//creates list of courses passed by user
//compares number of course quizzes passed by user to total number of quizzes in course
//if user passed course, list displays option to view and download course completion certificate
export default function passedCoursesList(courses, passed) {
  let q;
  return courses.map((course, index) => {
      q = course.quizzes.map((quiz) => {
        return passed.find((item) => {
          return quiz._id === item.of
        })
      })
      if(q.length === course.quizzes.length) {
        return <li key={index}><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><g><path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path></g></svg></li>;
      }
      return <li key={index}></li>
    })
}
