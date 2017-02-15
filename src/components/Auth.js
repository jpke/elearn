import React, {PropTypes, Component} from 'react';
import courseListCreator from '../utils/courseListCreator'
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
    console.log("passed: ", props.passed)
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
      courses = courseListCreator(this.props.courses, this.props.selectCourse, this.props.passed, this.props.token, this.props.url);
    }
      return (
        <div className="authContainer">

          {this.props.token ?
            <div className="course-list-container">
              <CourseList
                courses={courses}
                course={this.props.course}
                logOut={this.props.logOut}
              />
            </div>
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
