import React from 'react';
import {connect} from 'react-redux';
import {addUser, deleteUser} from '../actions/eLearnActions';
import listUsers from '../utils/listUsers';

export const AdminContainer = (props) => {
  return (
      <AdminView
        addUser={props.addUser}
        deleteUser={props.deleteUser}
        listUsers={listUsers}
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
      courseUser: state.authReducer.courseUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: (token, course, user) => {dispatch(addUser(token, course, user))},
    deleteUser: (token, course, user) => {dispatch(deleteUser(token, course, user))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);
