import React from 'react';
import {connect} from 'react-redux';
import {getLessons, getPDF, uploadPDF} from '../actions/eLearnActions';
import LessonsView from '../components/LessonsView';

//container for LessonsView
//displays course lessons available
const LessonsContainer = (props) => {
  //non-functional at present, will be used to trigger async action uploading pdf to server
  const uploadPDF = () => {
    // event.preventDefault();
    let files = document.getElementById("uploadPDFInput").files;
    console.log("event: ", files[0]);
    props.uploadPDF(props.token, props.courseID, files)
  }

  return (
    <LessonsView getLessons={props.getLessons}
      getPDF={props.getPDF}
      uploadPDF={uploadPDF}
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
    courseID: state.authReducer.course._id,
    lessons: state.lessonReducer.lessons,
    loading: state.authReducer.loadingItem,
    preview: state.lessonReducer.selectedPdf.preview,
    loggedIn: state.authReducer.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLessons: (token) => dispatch(getLessons(token)),
    getPDF: (id, token) => dispatch(getPDF(id, token)),
    uploadPDF: (token, courseID, file) => dispatch(uploadPDF(token, courseID, file))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsContainer);
