import React from 'react';
import {Link} from 'react-router';

const CourseList = (props) => {
  return (
    <div className="course-list">
      <h2>Select course</h2>
      <ul>
        {props.courses}
      </ul>
      {props.course &&
        <div>
          <p>Choose <Link to="/quiz" className="redirect">Quiz</Link> or <Link to="/lessons" className="redirect">Lessons</Link> to access course content</p>
          {props.course.admin &&
          <div>
            <p>Admin:</p>
            <Link to="/admin" className="redirect">
              <button className="manageUsers">Manage Enrolled Users</button>
            </Link>
          </div>
          }
        </div>
      }
      <button onClick={props.logOut}>Logout</button>
    </div>
  )
};

export default CourseList;
