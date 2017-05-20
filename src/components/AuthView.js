import React from 'react';
import CourseListCreator from '../utils/CourseListCreator'
import CourseList from '../components/CourseList';
import Register from '../components/Register';
import Login from '../components/Login';

//view for authContainer
//will call login or register views when user is not logged in
//will call list of courses available to user when user is logged in
const AuthView = (props) => {
  let courses;
  if(props.courses) {
    courses = CourseListCreator(props.courses, props.selectCourse, props.passed, props.token, props.url);
  }
  return (
    <div className="authContainer">

      {props.token ?
        //token present, indicating user is logged in
        //display courses accessible to user
        <div className="course-list-container">
          <CourseList
            courses={courses}
            course={props.course}
            logOut={props.logOut}
          />
        </div>
      :
        //token is not present, indicating user is not logged in
        //toggle between login and registration views
        props.viewLogin === true ?
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
