import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import listCreator from '../utils/listCreator'
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
  logOut() {
    this.props.logOut();
  }
  render() {
    let courses;
    if(this.props.courses) {
      courses = listCreator(this.props.courses, this.props.selectCourse);
    }
    console.log("course: ", this.props.course);
      return (
        <div className="authContainer">
          <h2>Welcome</h2>
          {this.props.token ?
            <div>
              <h3>Hi, {this.props.userName}</h3>
              <p>Select course</p>
              {courses}
              {this.props.course ?
                <p>Click on the <Link to="/quiz" className="redirect">Quiz</Link> or <Link to="/lessons" className="redirect">Lessons</Link> tabs to access course content</p>
              : ""
              }
              <button onClick={this.props.logOut}>Logout</button>
            </div>
          :
            this.state.login === true ?
            <div>
              <p>You must login or <button onClick={this.toggleView.bind(this)}>Register</button></p>
              <Login logIn={this.logIn.bind(this)} />
            </div>
            :
            <div>
              <p>You must register or <button onClick={this.toggleView.bind(this)}>Login</button></p>
              <Register register={this.register.bind(this)} />
            </div>
            }
        </div>
      );
  }
}
