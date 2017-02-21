import React from 'react';
import {connect} from 'react-redux';
import {updateCourse, editCourse, addUser, deleteUser, deleteUserFromCourse} from '../actions/eLearnActions';
import listUsers from '../utils/listUsers';
import AdminView from '../components/AdminView';

export const AdminContainer = (props) => {

  const editCourse = (event) => {
    event.preventDefault();
    props.editCourse(event.target.id, event.target.value);
  }

  const addUser = (event) => {
    event.preventDefault();
    props.addUser(props.token, props.course._id, event.target.elements.newUser.value, event.target.elements.admin.checked);
  }

  const deleteUser = (email) => {
    props.deleteUser(props.token, props.course._id, email)
  }

  const deleteUserFromCourse = (email) => {
    props.deleteUserFromCourse(props.token, props.course._id, email)
  }

  return (
      <AdminView
        editCourse={editCourse}
        addUser={addUser}
        deleteUser={deleteUser}
        deleteUserFromCourse={deleteUserFromCourse}
        message={props.message}
        updateCourse={props.updateCourse}
        listUsers={listUsers}
        newUser={props.newUser}
        course={props.course}
        enrollable={props.enrollable}
        enrolled={props.enrolled}
        _id={props._id}
        token={props.token}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return {
      _id: state.authReducer.userId,
      course: state.authReducer.course,
      enrollable: state.authReducer.enrollable,
      enrolled: state.authReducer.enrolled,
      token: state.authReducer.token,
      newUser: state.authReducer.newUser,
      message: state.authReducer.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCourse: (token, course) => {dispatch(updateCourse(token, course))},
    editCourse: (id, value) => {dispatch(editCourse(id, value))},
    addUser: (token, course_id, email, admin) => {dispatch(addUser(token, course_id, email, admin))},
    deleteUser: (token, course_id, email) => {dispatch(deleteUser(token, course_id, email))},
    deleteUserFromCourse: (token, course_id, email) => {dispatch(deleteUserFromCourse(token, course_id, email))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);
