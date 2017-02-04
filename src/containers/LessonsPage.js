import React from 'react';
import {connect} from 'react-redux';
import {getLessons, getPDF} from '../actions/eLearnActions';
import Lessons from '../components/Lessons';

const LessonsPage = (props) => {
  return (
    <Lessons getLessons={props.getLessons}
      getPDF={props.getPDF}
      token={props.token}
      lessons={props.lessons}
      loading={props.loading}
      preview={props.preview}
      loggedIn={props.loggedIn}
    />
  );
};

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    lessons: state.lessonReducer.lessons,
    loading: state.authReducer.loadingItem,
    preview: state.lessonReducer.selectedPdf.preview,
    loggedIn: state.authReducer.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLessons: (token) => dispatch(getLessons(token)),
    getPDF: (id, token) => dispatch(getPDF(id, token))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsPage);
