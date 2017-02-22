import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import AuthView from '../components/AuthView';

class AuthContainer extends Component {
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
    this.props.actions.register(form.userName.value, form.email.value, form.password.value);
  }
  logIn(event) {
    event.preventDefault();
    const form = event.target.elements;
    this.props.actions.logIn(form.email.value, form.password.value);
  }

  selectCourse(course) {
    if(course.admin) return this.props.actions.getEnrollable(this.props.token, course);
    else return this.props.actions.selectCourse(course);
  }

  render() {
    return (
        <AuthView
          toggleView={this.toggleView.bind(this)}
          register={this.register.bind(this)}
          logIn={this.logIn.bind(this)}
          isLoggedIn={this.state.login}
          selectCourse={this.selectCourse.bind(this)}
          logOut={this.props.actions.logOut}
          courses={this.props.courses}
          course={this.props.course}
          passed={this.props.passed}
          token={this.props.token}
          url={this.props.url}
        />
    );
  }
}

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
      userName: state.authReducer.userName,
      _id: state.authReducer.userId,
      courses: state.authReducer.courses,
      course: state.authReducer.course,
      passed: state.authReducer.passed,
      token: state.authReducer.token,
      view: state.authReducer.view,
      url: state.authReducer.url
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);
