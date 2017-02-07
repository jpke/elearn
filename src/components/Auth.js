import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import listCreator from '../utils/listCreator'
import CourseList from '../components/CourseList';
import Register from '../components/Register';
import Login from '../components/Login';

export default class Auth extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {login: true};
  }
  toggleView() {
    this.setState({login: !this.state.login});
  }
  register(event) {
    event.preventDefault();
    const form = event.target.elements;
    this.props.register(form.userName.value, form.email.value, form.password.value);
  }
  logIn(event) {
    event.preventDefault();
    const form = event.target.elements;
    this.props.logIn(form.email.value, form.password.value);
  }

  render() {
    let courses;
    if(this.props.courses) {
      courses = listCreator(this.props.courses, this.props.selectCourse);
    }
      return (
        <div className="authContainer">

          {this.props.token ?
            <CourseList
              courses={courses}
              course={this.props.course}
              logOut={this.props.logOut}
            />
          :
            this.state.login === true ?
            <div className="authFormContainer">
              <h2>Welcome</h2>
              <h4>You must login or </h4>
              <button className="toggleLogin" onClick={this.toggleView.bind(this)}>Register</button>
              <Login logIn={this.logIn.bind(this)} />
            </div>
            :
            <div className="authFormContainer">
              <h2>Welcome</h2>
              <h4>You must register or </h4>
              <button className="toggleLogin" onClick={this.toggleView.bind(this)}>Login</button>
              <Register register={this.register.bind(this)} />
            </div>
            }
        </div>
      );
  }
}
