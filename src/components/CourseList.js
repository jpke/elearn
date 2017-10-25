import React from 'react';
import { Link } from 'react-router';
import UpdatePasswordContainer from '../containers/UpdatePasswordContainer.jsx';

//view called by AuthView for authenticated user
//displays list of courses available to user
//displays checkmark next to listed courses user has passed (passed all quizzes)
//if user is admin, displays option allowing user to call admin view of course to edit course title and enrollable and enrolled users
const CourseList = props => {
  return (
    <div className="course-list">
      {props.course ? <h2>{props.course.name}</h2> : <h2>Select course</h2>}
      <ul>{props.courses}</ul>
      {props.course && (
        <div>
          <p>
            Choose{' '}
            <Link to="/quiz" className="redirect">
              Quiz
            </Link>{' '}
            or{' '}
            <Link to="/lessons" className="redirect">
              Lessons
            </Link>{' '}
            to access course content
          </p>
          {//if user is course admin, display admin view option for course
          props.course.admin && (
            <div>
              <p>Admin:</p>
              <Link to="/admin" className="redirect">
                <button className="manageUsers">Manage Course</button>
              </Link>
            </div>
          )}
        </div>
      )}
      <UpdatePasswordContainer />
      <button onClick={props.logOut}>Logout</button>
    </div>
  );
};

export default CourseList;
