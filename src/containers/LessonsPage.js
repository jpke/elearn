import React from 'react';
import {connect} from 'react-redux';
import {getLessons} from '../actions/eLearnActions';
import Lessons from '../components/Lessons';

const LessonsPage = (props) => {
  return (
    <Lessons getLessons={props.getLessons}
      loggedIn={props.loggedIn}
      token={props.token}
      lessons={props.lessons}
    />
  );
};

function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer.loggedIn,
    token: state.authReducer.token,
    lessons: state.lessonReducer.lessons,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLessons: (token) => dispatch(getLessons(token))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsPage);
