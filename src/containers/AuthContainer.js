import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import Auth from '../components/Auth';

export const AuthContainer = (props) => {
  return (
      <Auth
        register={props.actions.register}
        logIn={props.actions.logIn}
        logOut={props.actions.logOut}
        selectCourse={props.actions.selectCourse}
        userName={props.userName}
        courses={props.courses}
        course={props.course}
        _id={props._id}
        token={props.token}
        view={props.view}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
      userName: state.authReducer.userName,
      _id: state.authReducer._id,
      courses: state.authReducer.courses,
      course: state.authReducer.course,
      token: state.authReducer.token,
      view: state.authReducer.view
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
