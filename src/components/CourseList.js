import React from 'react';
import {Link} from 'react-router';

const CourseList = (props) => {
  return (
    <div className="course-list">
      <h2>Select course</h2>
      <ul>
        {props.courses}
      </ul>
      {props.course ?
        <p>Choose <Link to="/quiz" className="redirect">Quiz</Link> or <Link to="/lessons" className="redirect">Lessons</Link> to access course content</p>
      : ""
      }
      <button onClick={props.logOut}>Logout</button>
    </div>
  )
};

export default CourseList;
