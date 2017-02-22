import React from 'react';
import courseListCreator from '../utils/courseListCreator'
import CourseList from '../components/CourseList';
import Register from '../components/Register';
import Login from '../components/Login';

const AuthView = (props) => {
  let courses;
  if(props.courses) {
    courses = courseListCreator(props.courses, props.selectCourse, props.passed, props.token, props.url);
  }
  return (
    <div className="authContainer">

      {props.token ?
        <div className="course-list-container">
          <CourseList
            courses={courses}
            course={props.course}
            logOut={props.logOut}
          />
        </div>
      :
        props.isLoggedIn === true ?
        <div className="authFormContainer">
          <h2>Welcome</h2>
          <h4>You must login or </h4>
          <button className="toggleLogin" onClick={props.toggleView}>Register</button>
          <Login logIn={props.logIn} />
        </div>
        :
        <div className="authFormContainer">
          <h2>Welcome</h2>
          <h4>You must register or </h4>
          <button className="toggleLogin" onClick={props.toggleView}>Login</button>
          <Register register={props.register} />
        </div>
        }
    </div>
  );
}

export default AuthView;
