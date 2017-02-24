import React from 'react';
import {Link} from 'react-router';

//view for AdminContainer
//displays course title, enrollable unregistered emails and enrolled users
//allows user to edit course title, add or delete user from enrollable or enrolled lists for course
const AdminView = (props) => (
  <div className="admin-container">
    <Link to="/" className="toggleView">
      <button id="toggleView" className="toggleView">Back to Courses
      </button>
    </Link>
    <div>
      <h3 className="message">{props.message}</h3>
    </div>
    <div className="edit-course-header">
      <div>
      </div>
      <div className="title">
        <h3>Title</h3>
        <input type="text" id="course-title" name="course-title" className="edit-course-title" value={props.course.name} onChange={(e) => {props.editCourse(e)}}/>
      </div>
      <div className="save">
        <button id="updateCourse" className="updateCourse" onClick={() => {props.updateCourse(props.token, props.course)}}>Save</button>
      </div>
    </div>
    <div>
      <h3>Email addresses of students who can register for the course</h3>
    </div>
    <form name="newUserForm" onSubmit={(e) => {props.addUser(e)}}>
      <div>
        <input type='email' id="new-user" name="newUser" defaultValue={props.newUser} className="edit-new-user" placeholder='newUser@email.com' />
        <div className="admin-checkbox">
          <label>Admin:  &nbsp;</label>
          <input type="checkbox" id="new-user-admin" name="admin" className="edit-new-user-admin" />
        </div>
      </div>
      <button className="add-student" type='submit'>Add Student</button>
    </form>
    <div className="enrollable-users">
      <h4>Users who can enroll</h4>
      <ul className="user-list">
        {props.listUsers(props.enrollable, props.deleteUser)}

      </ul>
    </div>
    <div className="enrolled-users">
      <h4>Enrolled users</h4>
      <ul className="user-list-enrolled">
        {props.listUsers(props.enrolled, props.deleteUserFromCourse)}

      </ul>
    </div>
  </div>
);

export default AdminView;
