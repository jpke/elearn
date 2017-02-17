import React from 'react';
import {connect} from 'react-redux';
import {updateCourse, updateEnrollable, editCourse, addUser, deleteUser} from '../actions/eLearnActions';
import listUsers from '../utils/listUsers';
import AdminView from '../components/AdminView';

export const AdminContainer = (props) => {

  const editCourse = (event) => {
    event.preventDefault();
    props.editCourse(event.target.id, event.target.value);
  }

  const addUser = (event) => {
    event.preventDefault();
    console.log("admin: ", event.target.elements.admin.checked);
    props.addUser(props.token, props.course._id, event.target.elements.newUser.value, event.target.elements.admin.checked);
  }

  const deleteUser = (email) => {
    props.deleteUser(props.token, props.course._id, email)
  }

  return (
      <AdminView
        editCourse={editCourse}
        addUser={addUser}
        deleteUser={deleteUser}
        message={props.message}
        updateCourse={props.updateCourse}
        listUsers={listUsers}
        newUser={props.newUser}
        course={props.course}
        enrollable={props.enrollable}
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
      token: state.authReducer.token,
      newUser: state.authReducer.newUser,
      message: state.authReducer.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEnrollable: (token, course_id, email, admin) => {dispatch(updateEnrollable(token, course_id, email, admin))},
    updateCourse: (token, course) => {dispatch(updateCourse(token, course))},
    editCourse: (id, value) => {dispatch(editCourse(id, value))},
    addUser: (token, course_id, email, admin) => {dispatch(addUser(token, course_id, email, admin))},
    deleteUser: (token, course_id, email) => {dispatch(deleteUser(token, course_id, email))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);
