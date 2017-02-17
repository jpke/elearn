import React from 'react';
import {Link} from 'react-router';

const AdminView = (props) => (
  <div className="admin-container">
    <Link to="/" className="toggleView">
      <button id="toggleView" className="toggleView">Back to Courses
      </button>
    </Link>
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
      <input type='email' id="new-user" name="newUser" defaultValue={props.newUser} className="edit-new-user" placeholder='newUser@email.com' />
      <button className="add-student" type='submit'>Add Student</button>
    </form>
    <div className="enrollable-users">
      <ul className="user-list">
        {props.listUsers(props.course.enrollable, props.deleteUser)}
      </ul>
    </div>
  </div>
);

export default AdminView;
