import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import Auth from '../components/Auth';
import passedCoursesList from '../utils/passedCoursesList';

export const AuthContainer = (props) => {

  const getCertificate = (item) => {
    props.actions.getCertificate(props.token, item)
  }
  return (
      <Auth
        register={props.actions.register}
        logIn={props.actions.logIn}
        logOut={props.actions.logOut}
        selectCourse={props.actions.selectCourse}
        passedCoursesList={passedCoursesList}
        userName={props.userName}
        courses={props.courses}
        course={props.course}
        passed={props.passed}
        _id={props._id}
        token={props.token}
        view={props.view}
        url={props.url}
      />
  );
};

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
