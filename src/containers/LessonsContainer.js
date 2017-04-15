import React from 'react';
import {connect} from 'react-redux';
import {getLessons, getPDF, uploadPDF, deletePDF} from '../actions/eLearnActions';
import LessonsView from '../components/LessonsView';

//container for LessonsView
//displays course lessons available
const LessonsContainer = (props) => {
  //used to trigger async action uploading pdf to server
  const uploadPDF = () => {
    let files = document.getElementById("uploadPDFInput").files;
    props.uploadPDF(props.token, props.courseID, files)
  }

  return (
    <LessonsView getLessons={props.getLessons}
      getPDF={props.getPDF}
      uploadPDF={uploadPDF}
      deletePDF={props.deletePDF}
      token={props.token}
      courseName={props.courseName}
      courseID={props.courseID}
      admin={props.admin}
      lessons={props.lessons}
      loading={props.loading}
      preview={props.preview}
    />
  );
};

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    courseName: state.authReducer.course.name,
    courseID: state.authReducer.course._id,
    lessons: state.lessonReducer.lessons,
    admin: state.authReducer.course.admin,
    loading: state.authReducer.loadingItem,
    preview: state.lessonReducer.selectedPdf.preview
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLessons: (token) => dispatch(getLessons(token)),
    getPDF: (id, token) => dispatch(getPDF(id, token)),
    uploadPDF: (token, courseID, file) => dispatch(uploadPDF(token, courseID, file)),
    deletePDF: (token, courseID, lessonID) => dispatch(deletePDF(token, courseID, lessonID))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsContainer);
