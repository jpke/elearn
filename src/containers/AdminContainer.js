import React from 'react';
import {connect} from 'react-redux';
import {updateCourse, editCourse, addUser, deleteUser} from '../actions/eLearnActions';
import listUsers from '../utils/listUsers';
import AdminView from '../components/AdminView';

export const AdminContainer = (props) => {

  const editCourse = (event) => {
    event.preventDefault();
    props.editCourse(event.target.id, event.target.value);
  }

  const addUser = (event) => {
    event.preventDefault();
    props.addUser(event.target.elements.newUser.value);
  }

  return (
      <AdminView
        editCourse={editCourse}
        addUser={addUser}
        deleteUser={props.deleteUser}
        updateCourse={props.updateCourse}
        listUsers={listUsers}
        newUser={props.newUser}
        course={props.course}
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
      token: state.authReducer.token,
      newUser: state.authReducer.newUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCourse: (token, course) => {dispatch(updateCourse(token, course))},
    editCourse: (id, value) => {dispatch(editCourse(id, value))},
    addUser: (user) => {dispatch(addUser(user))},
    deleteUser: (index) => {dispatch(deleteUser(index))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);
